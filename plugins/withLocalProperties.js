const fs = require('fs');
const path = require('path');
const { withDangerousMod } = require('expo/config-plugins');

function findSdk() {
  const candidates = [
    process.env.ANDROID_HOME,
    process.env.ANDROID_SDK_ROOT,
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Android', 'Sdk'),
  ];
  return candidates.find((dir) => dir && fs.existsSync(dir));
}

function compareVersions(a, b) {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const difference = (partsA[i] ?? 0) - (partsB[i] ?? 0);
    if (difference !== 0) return difference;
  }
  return 0;
}

function findNewestCmake(sdk) {
  const cmakeRoot = path.join(sdk, 'cmake');
  if (!fs.existsSync(cmakeRoot)) return null;
  const versions = fs
    .readdirSync(cmakeRoot)
    .filter((name) => /^\d+(\.\d+)*$/.test(name))
    .sort(compareVersions);
  return versions.length > 0 ? path.join(cmakeRoot, versions[versions.length - 1]) : null;
}

function toPropertiesPath(dir) {
  return dir.replace(/\\/g, '/');
}

module.exports = function withLocalProperties(config) {
  return withDangerousMod(config, [
    'android',
    (modConfig) => {
      const sdk = findSdk();
      if (!sdk) return modConfig;

      const lines = [`sdk.dir=${toPropertiesPath(sdk)}`];
      const cmake = findNewestCmake(sdk);
      if (cmake) lines.push(`cmake.dir=${toPropertiesPath(cmake)}`);

      const file = path.join(modConfig.modRequest.platformProjectRoot, 'local.properties');
      fs.writeFileSync(file, lines.join('\n') + '\n');
      return modConfig;
    },
  ]);
};
