// import imagemin from 'imagemin';
// import imageminPngquant from 'imagemin-pngquant';
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  writeFile,
  readFile,
} from 'fs';
import Path from 'path';
import crypto from 'crypto';

const _filesStore = {};

const writeToFileDB = category => {
  const json = JSON.stringify(_filesStore);
  const jsonPath = Path.join(__dirname, './imgFileStore.json');

  if (existsSync(jsonPath)) {
    readFile(jsonPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        throw new Error('read file path error');
      } else {
        const currStore = JSON.parse(data);
        if (currStore[category]) {
          currStore[category] = [
            ..._filesStore[category],
            ...currStore[category],
          ];
        } else {
          currStore[category] = [..._filesStore[category]];
        }

        const newStore: string = JSON.stringify(currStore);
        writeFile(jsonPath, newStore, 'utf8', err => {
          console.error(err);
        });
      }
    });

    return;
  }

  writeFile(jsonPath, json, 'utf8', err => {
    console.error(err);
  });

  return;
};

export const resolvers = {
  Query: {
    hello: () => 'Hello',
    files: () => 'files',
  },

  Mutation: {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uploadFile: async (_, { files, category }) => {
      existsSync(Path.join(__dirname, './img', category)) ||
        mkdirSync(Path.join(__dirname, './img', category));

      _filesStore[category] = [];

      try {
        for (let i = 0; i < files.length; i++) {
          console.log(files[i].width);
          const { createReadStream, filename } = await files[i];
          const splitArr = filename.split('.');
          const fileExt = splitArr[splitArr.length - 1] || '.png';
          const hashedName = crypto
            .createHash('md5')
            .update(filename)
            .digest('hex');
          const hashedFileName = `${hashedName}.${fileExt}`;

          new Promise((resolve, reject) =>
            createReadStream()
              .pipe(
                createWriteStream(
                  Path.join(__dirname, './img', category, hashedFileName)
                )
              )
              .on('finish', resolve)
              .on('error', reject)
          );

          _filesStore[category].push({
            src: `${category}/${hashedFileName}`,
            alt: `${hashedFileName}`,
          });
        }
        writeToFileDB(category);

        return {
          success: true,
          message: 'Your Files have successfully been uploaded',
        };
      } catch (err) {
        return {
          success: false,
          message: err,
        };
      }
    },
  },
};
