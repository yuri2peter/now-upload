import path from 'path';
require('dotenv').config();

const env = process.env as unknown as {
  PORT?: string;
  MAX_FILE_SIZE?: string;
};

export const IS_PROD = process.env.NODE_ENV === 'production';
export const ROOT_PATH: string = path.resolve(__dirname, '../');
export const PORT = Number(env.PORT) || 3000;
export const MAX_FILE_SIZE = Number(env.MAX_FILE_SIZE) || 100; // 文件上传大小上限，默认100MB
