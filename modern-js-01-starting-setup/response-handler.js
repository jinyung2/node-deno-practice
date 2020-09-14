// const fs = require('fs').promises;
import {promises as fs} from 'fs';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const resHandler = (req, res, next) => {
  fs.readFile('my-page.html', 'utf-8').then(data => {
    // console.log(data);
    res.send(data);
  }).catch(err => {
    console.log(err);
  });
  // const filePath = path.join(__dirname, 'my-page.html');
  // res.sendFile(filePath);
};

// module.exports = resHandler;

// export default resHandler; 