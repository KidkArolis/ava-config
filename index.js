
var fs = require('fs')
var path = require('path')

function closest (dirname, pathToCheck) {
  dirname = path.resolve(dirname)
  var pathsChecked = []
  do {
    var fullPath = path.join(dirname, pathToCheck)
    pathsChecked.push(fullPath)
    if (!fs.existsSync(fullPath)) continue
    return { found: true, path: dirname }
  } while (!isRoot(
    dirname = path.join(dirname, '..')
  ))

  return { found: false, pathsChecked }
}

function isRoot (dirname) {
  return path.resolve(dirname, '..') === dirname
}

//start 2 folders up from dirname (which points the ava-config module itself) to avoid looking inside node_modules and finding another folder called config
var configDir = closest(path.join(__dirname, '../..'), 'config')

if (!configDir.found) {
  console.error('ava-config could not find the config dir.')
  console.error('Paths checked:')
  console.error(configDir.pathsChecked)
  process.exit(1)
}

process.env.NODE_ENV = 'test'
process.env.NODE_CONFIG_DIR = path.join(configDir.path, 'config')