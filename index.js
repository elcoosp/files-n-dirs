const fs = require('fs'),
  path = require('path'),
  { promisify } = require('util'),
  writeFile = promisify(fs.writeFile),
  mkdir = promisify(fs.mkdir)

const mkDirsNFiles = (tree, currentDir = process.cwd()) => {
  if (currentDir !== process.cwd()) mkdir(currentDir)

  return Promise.all([
    tree.files &&
      Promise.all(
        tree.files.map(fileName =>
          writeFile(path.join(currentDir, fileName), '')
        )
      ),
    Object.keys(tree)
      .filter(x => x !== 'files')
      .reduce(
        (acc, folder) =>
          tree[folder]
            ? acc.concat(
                mkDirsNFiles(tree[folder], path.join(currentDir, folder))
              )
            : acc,
        []
      )
  ])
}

// ### Test
// mkDirsNFiles({
//   dgf: { files: ['a', 'g', 'gfs'] },
//   dfzegf: { files: ['a', 'g'] }
// }).catch(console.log)
module.exports = mkDirsNFiles
