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

    const indexContent = [
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
          // Passing fill={props.color} ensures the SVG takes the tab bar's tint color
          return `export const ${name}${suffix} = (props: ISVGProps) => <${name} fill={props.color} {...resolveSize(props)} />;`;
        })
        .join('\n'),
      '',
    ].join('\n');

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
