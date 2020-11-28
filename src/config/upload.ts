import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import { request } from 'express';
const tpmFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  directory: tpmFolder,
  storage: multer.diskStorage({
		destination: tpmFolder,
		filename(request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString('hex');
			const fileName = `${fileHash}-${file.originalname}`;

			return callback(null, fileName);
		}
	}),
}
