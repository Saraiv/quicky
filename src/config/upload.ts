import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const terms = path.resolve(__dirname, '..', '..', 'terms');

interface IUploadConfig {
  driver: 'disk';

  tmpFolder: string;
  terms: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  terms,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const fileArr = file.originalname.split('.');
        const fileExt = fileArr[fileArr.length - 1];
        const fileName = `avatar_${fileHash}.${fileExt}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.BUCKET,
    },
  },
} as IUploadConfig;
