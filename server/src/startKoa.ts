import Koa from 'koa';
import Router from 'koa-router';
import bodyPaser from 'koa-body';
import http from 'http';
import CSRF from 'koa-csrf';
import staticServer from 'koa-static';
import cors from '@koa/cors';
import { ROOT_PATH } from './configs';
import { main as controller } from './controllers';
import path from 'path';
import { nanoid } from 'nanoid';

export function startKoa() {
  const router = new Router();
  controller(router);
  const app = new Koa();
  app.use(cors());
  app.use(new CSRF());
  app.use(
    staticServer(ROOT_PATH + '/html/frontend', {
      maxAge: 30 * 24 * 3600 * 1000, // 30天的强缓存
      immutable: true, // 声明资源是不会变更的可以永久缓存
    })
  );
  app.use(
    staticServer(ROOT_PATH + '/html/resources', {
      maxAge: 30 * 24 * 3600 * 1000, // 30天的强缓存
      immutable: true, // 声明资源是不会变更的可以永久缓存
    })
  );
  app.use(
    bodyPaser({
      jsonLimit: '100mb',
      multipart: true,
      // 上传文件
      formidable: {
        uploadDir: ROOT_PATH + '/html/resources',
        maxFieldsSize: 100 * 1024 * 1024, // 100MB
        multiples: false,
        onFileBegin: (name, file) => {
          const { originalFilename } = file;
          const ext = path.extname(originalFilename || '');
          // 使用随机文件名
          const newFilename = nanoid() + ext;
          file.newFilename = newFilename;
          file.filepath = ROOT_PATH + '/html/resources/' + newFilename;
        },
      },
    })
  );
  app.use(router.routes());
  return http.createServer(app.callback());
}
