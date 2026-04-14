const { readdirSync, writeFileSync } = require('fs');
const path = require('path');

const isSVG = fileName => /.svg$/.test(fileName);
const removeExtension = file => file.split('.')[0];

const toPascalCase = string =>
  string
    .split(/[-_ ]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

const generateIndex = (dirPath) => {
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
        return `export const ${name}SVG = (props: ISVGProps) => <${name} {...resolveSize(props)} />;`;
      })
      .join('\n'),
    '',
  ].join('\n');

  writeFileSync(path.join(dirPath, 'index.tsx'), indexContent);
};

// Generate for svg directory
try {
  generateIndex('src/assets/svg/');
  console.log('✅ SVG components generated successfully for svg folder!');
} catch (error) {
  console.error('❌ Error generating SVG components:', error.message);
}
