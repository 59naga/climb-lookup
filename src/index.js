/**
 * @module climb-lookup
 */

import fs from 'fs';
import path from 'path';
import objectAssign from 'object-assign';

/**
* Get recursively climbing paths.
*
* @function getPaths
* @param {string} filePath - base path
* @return {array} paths - an abosolute file paths from filePath to root
*/
export function getPaths(filePath) {
  const paths = [];

  const fileName = path.basename(filePath);
  let current = path.resolve(filePath);
  while (current.split(path.sep).length > 2) {// unless `/${file}`
    paths.push(current);

    current = path.join(path.join(current, '..', '..'), fileName);
  }
  paths.push(current);

  return paths;
}

/**
* lookup climbing recursively file like a `require`.
*
* @function lookup
* @param {string} file - lookup file name
* @param {object} [options] -
* @param {object} [options.cwd=process.cwd()] - begin path
* @param {object} [options.mode=null] - pass to fs.accessSync as 2nd argument
* @param {lookedupAbsolutePath} callback -
*/
export function lookup(file, ...params) {
  const [options, callback] = params.length === 1 ? [{}, params[0]] : params;
  const opts = objectAssign({
    cwd: process.cwd(),
  }, options);

  /**
   * Callback for looked up absolute file path.
   *
   * @callback lookedupAbsolutePath
   * @param {error} error - no paths found
   * @param {string} lookedupPath - a found absolute file path
   */
  const paths = getPaths(path.resolve(opts.cwd, file));
  paths.reduceRight((next, filePath) => () => {
    fs.access(filePath, opts.mode, (error) => {
      if (error) {
        return next();
      }

      return callback(null, filePath);
    });
  }, () => {
    callback(Error(`ENOENT: no such paths, access '${paths.join("', '")}'`));
  })();
}

/**
* Synchronous version of lookup
*
* @function lookupSync
* @param {string} file - lookup file name
* @param {object} [options]
* @param {object} [options.cwd=process.cwd()] - begin path
* @param {object} [options.mode=null] - pass to fs.accessSync as 2nd argument
* @return {string} lookedupPath - a found absolute file path
* @throws if no such paths
*/
export function lookupSync(file, options = {}) {
  const opts = objectAssign({
    cwd: process.cwd(),
  }, options);

  const paths = getPaths(path.resolve(opts.cwd, file));
  for (let i = 0; i < paths.length; i++) {
    try {
      fs.accessSync(paths[i], opts.mode);
      return paths[i];
    } catch (error) {
      // ignore
    }
  }

  throw new Error(`ENOENT: no such paths, access '${paths.join("', '")}'`);
}
