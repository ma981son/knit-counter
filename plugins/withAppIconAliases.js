const path = require('path');
const { AndroidConfig, withFinalizedMod } = require('expo/config-plugins');

const { getMainActivityOrThrow, getMainApplicationOrThrow, readAndroidManifestAsync, writeAndroidManifestAsync } =
  AndroidConfig.Manifest;

const DEFAULT_ALIAS = '.MainActivityRosadito';

function isLauncherFilter(filter) {
  return (filter.action ?? []).some((action) => action.$['android:name'] === 'android.intent.action.MAIN');
}

function launcherFilter() {
  return {
    action: [{ $: { 'android:name': 'android.intent.action.MAIN' } }],
    category: [{ $: { 'android:name': 'android.intent.category.LAUNCHER' } }],
  };
}

module.exports = function withAppIconAliases(config) {
  return withFinalizedMod(config, [
    'android',
    async (modConfig) => {
      const file = path.join(modConfig.modRequest.platformProjectRoot, 'app', 'src', 'main', 'AndroidManifest.xml');
      const manifest = await readAndroidManifestAsync(file);
      const application = getMainApplicationOrThrow(manifest);
      const mainActivity = getMainActivityOrThrow(manifest);
      const linkFilters = (mainActivity['intent-filter'] ?? []).filter((filter) => !isLauncherFilter(filter));
      delete mainActivity['intent-filter'];

      const defaultAlias = {
        $: {
          'android:name': DEFAULT_ALIAS,
          'android:enabled': 'true',
          'android:exported': 'true',
          'android:icon': '@mipmap/ic_launcher',
          'android:roundIcon': '@mipmap/ic_launcher_round',
          'android:targetActivity': '.MainActivity',
        },
      };
      const otherAliases = (application['activity-alias'] ?? []).filter(
        (alias) => alias.$['android:name'] !== DEFAULT_ALIAS
      );

      application['activity-alias'] = [defaultAlias, ...otherAliases].map((alias) => ({
        ...alias,
        'intent-filter': [launcherFilter(), ...linkFilters],
      }));

      await writeAndroidManifestAsync(file, manifest);
      return modConfig;
    },
  ]);
};
