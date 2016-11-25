'use babel';

import fs from 'fs';
import path from 'path';
import os from 'os';

const batPath = path.join(__dirname,'single-ut.bat');

function existsFileSync(file) {
  try {
    fs.accessSync(file, fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

function existsDirSync(file) {
  try {
    return fs.statSync(file).isDirectory();
  } catch (err) {
    return false;
  }
}

function findProjectPath(currentPath) {
  if( !fs.existsSync(path.join(currentPath, 'package.json')) ) {
    let parentPath = path.join(currentPath, '..');
    if( fs.statSync(parentPath).isDirectory() ) {
      return findProjectPath(parentPath);
    }
    return 'no way';
  }
  return currentPath;
}

function start(editor) {

  let projectPath = findProjectPath(editor.getPath());
  let webpackTestConfigPath = path.join(projectPath, 'webpac-single-ut.config.js');
  let modulesPath = path.join(projectPath, 'node_modules');
  let mochaWebpackPath = path.join(__dirname, 'node_modules/.bin/mocha-webpack');

  fs.writeFile(batPath, `
    set Path=${projectPath};%Path%
    set NODE_PATH=${modulesPath};%NODE_PATH%
    ${mochaWebpackPath} --webpack-config ${webpackTestConfigPath} --watch ${editor.getPath()}
    `, () => {
    const result = require('child_process').spawn('cmd.exe', ['/c', 'start', batPath]);
  });  

  // let spawn = require('child_process').spawn;
/*

set NODE_PATH=C:\\Workspaces\\Jazz-UI\\node_modules;%NODE_PATH%
    ${path.join(__dirname, 'node_modules\\.bin\\mocha-webpack')} --webpack-config .\\conf\\webpack-test-single.config.js ${editor.getPath()}
*/
  // const result = spawn('cmd.exe', ['/k', 'start', `set NODE_PATH=C:\\Workspaces\\Jazz-UI\\node_modules;%NODE_PATH%`]);

  // let starting = false;
  // let dataCount = 0;

  // result.on('message', function(data) {
  //   dataCount++;
  //   console.log('out');
  //   console.log(`${data}`);
  //   console.log(dataCount);
  // });
  //   result.send('dir');
  // result.stdout.on('data', function(data) {
  //   dataCount++;
  //   console.log('out');
  //   console.log(`${data}`);
  //   console.log(dataCount);
  //   if( dataCount === 1 ) {
  //     // result.stdin.write('dir', '');
  //     result.stdin.write(new Buffer(`${path.join(__dirname, 'node_modules\\.bin\\mocha-webpack')} --webpack-config .\\conf\\webpack-test-single.config.js ${editor.getPath()}
  //       `));
  //   }
  // });
  // result.stderr.on('data', function(data) {
  //   console.log('err');
  //   console.log(`${data}`);
  // });
  // result.on('disconnect', (code) => {
  //   console.log(`Child disconnectd with code ${code}`);
  // });
  // result.on('colse', (code) => {
  //   console.log(`Child colsed with code ${code}`);
  // });
  // result.on('exit', (code) => {
  //   console.log(`Child exited with code ${code}`);
  // });

  // result.stdin.write('dir');

  // result.send()

//   var exec = require('child_process').exec;
//   var cmd = `${path.join(__dirname, 'node_modules\\.bin\\mocha-webpack')} --webpack-config .\\conf\\webpack-test-single.config.js ${editor.getPath()}`;//.\\node_modules\\.bin\\mocha-webpack --webpack-config .\\conf\\webpack-test-single.config.js --watch ${editor.getPath()}
// //set NODE_PATH=C:\\Workspaces\\Jazz-UI\\node_modules;%NODE_PATH% \n
//   process.env.Path = 'C:\\Workspaces\\Jazz-UI;' + process.env.Path;
//   process.env.NODE_PATH = 'C:\\Workspaces\\Jazz-UI\\node_modules;' + process.env.NODE_PATH;
//   console.log(process.env);
//   exec(cmd, {
//     env: process.env
//   }, function(error, stdout, stderr) {
//     // command output is in stdout
//     console.log(error);
//     console.log(stdout);
//   });
}

module.exports = {
  activate: function() {
    atom.commands.add('atom-workspace',{
        'single-ut:start': function() {
          start(atom.workspace.getActiveTextEditor());
        }
      }
    );
  }
}
