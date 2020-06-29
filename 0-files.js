const fs = require('fs');
const fsp = require('fs/promises');
const http = require('http');

//! File/folder CRUD
function filecallback() {
  fs.mkdir('stuff', (err) => {
    if (err) return console.error(err);
    fs.readFile('readme.txt', 'utf8', (err, data) => {
      if (err) return console.error(err);
      fs.writeFile('./stuff/writeme.txt', data, (err) => {
        if (err) return console.error(err);
        setTimeout(() => {
          fs.rmdir('stuff', { recursive: true }, (err) => {
            if (err) return console.error(err);
          });
          console.log('Callback: DONE');
        }, 2000);
      });
    });
  });
}
function filepromise() {
  fsp
    .mkdir('stuff')
    .then(() => fsp.readFile('readme.txt'))
    .then((data) => fsp.writeFile('./stuff/writeme.txt', data))
    .then(() =>
      setTimeout(() => {
        fsp.rmdir('stuff', { recursive: true });
        console.log('Promise: DONE');
      }, 2000)
    )
    .catch((err) => console.error(err));
}
async function fileasync() {
  try {
    await fsp.mkdir('stuff');
    let data = await fsp.readFile('readme.txt');
    await fsp.writeFile('./stuff/writeme.txt', data);
    setTimeout(() => {
      fsp.rmdir('stuff', { recursive: true });
      console.log('Async: DONE');
    }, 2000);
  } catch (err) {
    console.error(err);
  }
}
module.exports = { fc: filecallback, fp: filepromise, fa: fileasync };