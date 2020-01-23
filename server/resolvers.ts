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
      
      for (let i: number = 0; i < files.length; i++ ) {
        const { createReadStream, filename } = await files[i];
        storeUpload({ stream: createReadStream, filename });
      }

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
