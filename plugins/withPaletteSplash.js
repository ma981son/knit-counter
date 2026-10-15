const fs = require('fs');
const path = require('path');
const {
  compositeImagesAsync,
  generateImageAsync,
  generateImageBackgroundAsync,
} = require('@expo/image-utils');
const {
  AndroidConfig,
  withAndroidColors,
  withAndroidColorsNight,
  withAndroidStyles,
  withDangerousMod,
} = require('expo/config-plugins');

const BASE_THEME = 'Theme.App.SplashScreen';
const CANVAS_WIDTH = 288;
const DENSITIES = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };

function resourceName(prefix, theme) {
  return `${prefix}_${theme.name.toLowerCase()}`;
}

async function writeLogos(projectRoot, theme, image, folderPrefix, imageWidth) {
  const resDir = path.join(projectRoot, 'android', 'app', 'src', 'main', 'res');
  const fileName = `${resourceName('splashscreen_logo', theme)}.png`;

  for (const [density, multiplier] of Object.entries(DENSITIES)) {
    const size = imageWidth * multiplier;
    const canvasSize = CANVAS_WIDTH * multiplier;
    const background = await generateImageBackgroundAsync({
      width: canvasSize,
      height: canvasSize,
      backgroundColor: 'transparent',
      resizeMode: 'cover',
    });
    const { source: foreground } = await generateImageAsync(
      { projectRoot, cacheType: 'palette-splash' },
      { src: image, resizeMode: 'contain', width: size, height: size },
    );
    const logo = await compositeImagesAsync({
      background,
      foreground,
      x: (canvasSize - size) / 2,
      y: (canvasSize - size) / 2,
    });

    const folder = path.join(resDir, `${folderPrefix}-${density}`);
    await fs.promises.mkdir(folder, { recursive: true });
    await fs.promises.writeFile(path.join(folder, fileName), logo);
  }
}

function withLogos(config, { themes, imageWidth }) {
  return withDangerousMod(config, [
    'android',
    async (modConfig) => {
      const { projectRoot } = modConfig.modRequest;
      for (const theme of themes) {
        await writeLogos(projectRoot, theme, theme.image, 'drawable', imageWidth);
        await writeLogos(projectRoot, theme, theme.dark.image, 'drawable-night', imageWidth);
      }
      return modConfig;
    },
  ]);
}

function withColors(config, { themes }) {
  config = withAndroidColors(config, (modConfig) => {
    for (const theme of themes) {
      AndroidConfig.Colors.assignColorValue(modConfig.modResults, {
        name: resourceName('splashscreen_background', theme),
        value: theme.backgroundColor,
      });
    }
    return modConfig;
  });
  return withAndroidColorsNight(config, (modConfig) => {
    for (const theme of themes) {
      AndroidConfig.Colors.assignColorValue(modConfig.modResults, {
        name: resourceName('splashscreen_background', theme),
        value: theme.dark.backgroundColor,
      });
    }
    return modConfig;
  });
}

function withThemes(config, { themes }) {
  return withAndroidStyles(config, (modConfig) => {
    for (const theme of themes) {
      const parent = { name: `${BASE_THEME}.${theme.name}`, parent: BASE_THEME };
      modConfig.modResults = AndroidConfig.Styles.assignStylesValue(modConfig.modResults, {
        add: true,
        parent,
        name: 'windowSplashScreenBackground',
        value: `@color/${resourceName('splashscreen_background', theme)}`,
      });
      modConfig.modResults = AndroidConfig.Styles.assignStylesValue(modConfig.modResults, {
        add: true,
        parent,
        name: 'windowSplashScreenAnimatedIcon',
        value: `@drawable/${resourceName('splashscreen_logo', theme)}`,
      });
    }
    return modConfig;
  });
}

module.exports = function withPaletteSplash(config, options) {
  config = withLogos(config, options);
  config = withColors(config, options);
  return withThemes(config, options);
};
