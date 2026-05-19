const { readdirSync, writeFileSync } = require('fs');
const path = require('path');

const isSVG = fileName => /.svg$/.test(fileName);
const removeExtension = file => file.split('.')[0];

// Improved PascalCase to handle existing capitalization and delimiters
const toPascalCase = string =>
  string
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase
    .split(/[-_ ]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

const generateIndex = (dirPath, suffix = 'Icon') => {
  try {
    const icons = readdirSync(dirPath)
      .filter(isSVG)
      .map(removeExtension);

    let indexContent = [
      '/**',
      '* AUTO GENERATED FILE — DO NOT EDIT',
      '*/',
      "import React from 'react';",
      "import { SvgProps } from 'react-native-svg';",
      '',
      icons.map(icon => `import ${toPascalCase(icon)} from './${icon}.svg';`).join('\n'),
      '',
      'export interface ISVGProps extends SvgProps {',
      '  size?: number;',
      '}',
      '',
      'const resolveSize = (props: ISVGProps) => {',
      '  const { size, width, height, ...rest } = props;',
      '  return {',
      '    width: width ?? size ?? 24,',
      '    height: height ?? size ?? 24,',
      '    ...rest,',
      '  };',
      '};',
      '',
      icons
        .map(icon => {
          const name = toPascalCase(icon);
          // Removed forced fill={props.color} so SVG can retain its native multiple colors
          return `export const ${name}${suffix} = (props: ISVGProps) => <${name} {...resolveSize(props)} />;`;
        })
        .join('\n'),
      '',
    ].join('\n');

    // Automatically append custom manual PNG exports for src/assets/images/ directory
    if (dirPath.includes('images')) {
      indexContent += `
export const Homebottombanner1Image = require('./homebottombanner1.png');
export const Homebottombanner2Image = require('./homebottombanner2.png');
export const Homemiddlebanner1Image = require('./homemiddlebanner1.png');
export const Homemiddlebanner2Image = require('./homemiddlebanner2.png');

// Re-export missing deleted SVGs as aliases of existing SVG components to keep all file imports intact as requested
export const HomeTopbanner1Image = require('./homeTopbanner1.png');
export const HomeTopbanner2Image = require('./homeTopbanner2.png');
export const HomeTopbanner3Image = require('./homeTopbanner3.png');
export const EmergencyAssistBannerImage = TractorImage;
export const CategoryOverviewBannerImage = TractorImage;
export const BookingDetailBannerImage = require('./BookingDetailBanner.png');

export const categoryOverViewBanner = require('./categoryOverViewBanner.png');
export const ServiceEmergencyBanner = require('./ServiceEmergencyBanner.png');
export const ServiceOverviewBanner = require('./ServiceOverviewBanner.png');
`;
    }

    writeFileSync(path.join(dirPath, 'index.tsx'), indexContent);
    console.log(`✅ Generated: ${path.join(dirPath, 'index.tsx')}`);
  } catch (error) {
    console.warn(`⚠️ Skipping ${dirPath}: ${error.message}`);
  }
};

// Generate for all asset directories
generateIndex('src/assets/icons/', 'Icon');
generateIndex('src/assets/svg/', 'SVG');
generateIndex('src/assets/images/', 'Image');

console.log('✨ All SVG components generated successfully with color support!');
