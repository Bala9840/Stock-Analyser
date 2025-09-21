const fs = require('fs');
const path = require('path');

const targetDir = 'D:/_BJ/_Projects/stock-analysis/src'; // Your specific project path

function removeBOM(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.charCodeAt(0) === 0xFEFF) {
    fs.writeFileSync(filePath, content.slice(1), 'utf8');
    console.log(`✔ BOM removed from: ${filePath}`);
  }
}

function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.js')) {
      removeBOM(fullPath);
    }
  });
}

processDir(targetDir);
