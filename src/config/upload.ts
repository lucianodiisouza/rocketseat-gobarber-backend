import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tempfolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  directory: tempfolder,
  storage: multer.diskStorage({
    destination: tempfolder,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return cb(null, filename);
    },
  }),
};
