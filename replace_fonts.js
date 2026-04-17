const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      if (fullPath.includes('typography.ts')) continue;
      
      let initialContent = fs.readFileSync(fullPath, 'utf8');
      
      // We only want to replace 'poppins' with 'roboto', mostly for variables and string literals
      let newContent = initialContent.replace(/poppins/g, 'roboto');
      
      if (initialContent !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated:', fullPath);
      }
    }
  }
}

processDir('/Users/pallavipatel/Documents/GitHub/TractorWalla/src');
console.log('Done replacing poppins with roboto.');
