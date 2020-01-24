import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  writeFile,
  readFile,
} from 'fs';
import Path from 'path';

const files = {};

// const compressFiles = () => {};

const writeToFileStore = category => {
  const json = JSON.stringify(files);
  const jsonPath = Path.join(__dirname, './imgFileStore.json');

  if (existsSync(jsonPath)) {
    readFile(jsonPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const currStore = JSON.parse(data);

        if (currStore[category]) {
          currStore[category] = [...files[category], ...currStore[category]];
        } else {
          currStore[category] = [...files[category]];
        }

        const newStore: string = JSON.stringify(currStore);
        writeFile('imgFileStore.json', newStore, 'utf8', err => {
          console.error(err);
        });
      }
    });

    return;
  }

  writeFile('imgFileStore.json', json, 'utf8', err => {
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

      files[category] = [];

      for (let i = 0; i < files.length; i++) {
        const { createReadStream, filename } = await files[i];
        new Promise((resolve, reject) =>
          createReadStream()
            .pipe(
              createWriteStream(
                Path.join(__dirname, './img', category, filename)
              )
            )
            .on('finish', resolve)
            .on('error', reject)
        );

        files[category].push(`${category}/${filename}`);
      }

      writeToFileStore(category);
    },
  },
};
