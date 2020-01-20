import { createWriteStream } from 'fs';
import Path from 'path';

export const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream()
      .pipe(createWriteStream(Path.join(__dirname, './img', filename)))
      .on('finish', resolve)
      .on('error', reject)
  );
