import multer from 'multer';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import { storeUpload } from './helpers';
import { createWriteStream } from 'fs';

const files = {};

export const resolvers = {
  Query: {
    hello: () => 'Hello',
    files: () => files,
  },

  Mutation: {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uploadFile: async (_, { files, category }) => {
      const { createReadStream, filename } = await files[0];

      storeUpload({ stream: createReadStream, filename });

      // await new Promise((resolve, reject) => {
      //   createReadStream()
      //     .pipe(
      //       createWriteStream(Path.join(__dirname, '../public/img', filename))
      //     )
      //     .on('close', resolve);
      // });
    },
  },
};
