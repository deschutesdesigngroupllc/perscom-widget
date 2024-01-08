import zlib from 'zlib';

/**
 * Compress a base 64 encoded string
 *
 * @param string
 * @returns {Promise<unknown>}
 */
export function compressString(string) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(string);
    zlib.gzip(buffer, (err, compressed) => {
      if (err) reject(err);
      resolve(compressed.toString('base64'));
    });
  });
}

/**
 * Decompress a base 64 encoded string
 *
 * @param compressedString
 * @returns {Promise<unknown>}
 */
export function decompressString(compressedString) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(compressedString, 'base64');
    zlib.unzip(buffer, (err, decompressed) => {
      if (err) reject(err);
      resolve(decompressed.toString());
    });
  });
}
