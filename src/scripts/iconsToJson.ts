/* eslint-disable @typescript-eslint/no-explicit-any */

// Import necessary modules with ES module syntax
import { promises as fs, readdirSync, writeFileSync } from 'fs';
import { optimize as optimizeSvg } from 'svgo';
import { fileURLToPath } from 'url';
import * as path from 'path';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.resolve(__dirname, '../icons');
const OUT_FILE = path.resolve(__dirname, '../icons/optimized-icons.ts');

console.log(`Building optimized icons...`);

// Convert icon path and fill to currentColor
const BlackToCurrentColorSVGOPlugin = {
  type: 'visitor',
  name: 'blackToCurrentColor',
  fn: () => ({
    element: {
      enter: (node: any,) => {
        const { fill, stroke } = node.attributes;
        if (fill && fill !== 'none') {
          node.attributes.fill = 'currentColor';
        }
        if (stroke && stroke !== 'none') {
          node.attributes.stroke = 'currentColor';
        }
      },
    },
  }),
};

// Retrieve all SVG files from given path
const svgFiles = readdirSync(ICONS_DIR).filter(f => path.extname(f) === '.svg');

const convertedContents = svgFiles.map(async (filename) => {
  // Read individual SVG file
  const content = await fs.readFile(path.join(ICONS_DIR, filename), { encoding: 'utf-8' });

  // Get name from file removing extension
  const iconName = filename.slice(0, -4);

  // Optimize vector image with SVGO
  const { data: optimized } = optimizeSvg(content, {
    path: iconName,
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      'removeXMLNS',
      'prefixIds',
      'sortAttrs',
      'removeDimensions',
      'removeScriptElement',
      'reusePaths',
      BlackToCurrentColorSVGOPlugin,
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            { width: '1em', height: '1em' },
          ],
        },
      },
    ],
  });

  // Icon custom component
  const icon = `<Icon name="${iconName}" />`;

  // Generic icon component (can be used without integrating Custom Icons)
  const jsx = `
    export const Icon_${iconName} = () => (
      ${optimized}
    );
  `;

  return [
    iconName,
    {
      svg: optimized,
      jsx: jsx,
      component: icon,
    },
  ];
});

// Write all SVGs to a file in JSON format
Promise.all(convertedContents).then((entries) => {
  const iconsObject = Object.fromEntries(entries);
  writeFileSync(
    OUT_FILE,
    `/* eslint-disable */\n// This file is auto-generated, please don't modify it directly. If you want to make changes, make them on $PROJECT/scripts/iconsToJson.ts instead\nexport const icons = ${JSON.stringify(iconsObject, null, 2)};`,
    { encoding: 'utf-8' }
  );
  console.log('Finished building optimized-icons.ts');
});
