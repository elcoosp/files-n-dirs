const fs = require('fs')
const path = require('path')

const writeFile = (path, data, options) =>
  new Promise((reject, resolve) =>
    fs.writeFile(path, data, options, e => (e ? reject(e) : resolve()))
  )

const mkdir = (path, mode, options) =>
  new Promise((reject, resolve) =>
    fs.mkdir(path, mode, e => (e ? reject(e) : resolve()))
  )

const mkDirsNFiles = (tree, currentDir = process.cwd()) => {
  if (currentDir !== process.cwd()) mkdir(currentDir)

  tree.files &&
    tree.files.forEach(fileName =>
      writeFile(path.join(currentDir, fileName)).catch(console.log)
    )

  Object.keys(tree)
    .filter(x => x !== 'files')
    .forEach(f => mkDirsNFiles(tree[f], path.join(currentDir, f)))
}

module.exports = mkDirsNFiles
