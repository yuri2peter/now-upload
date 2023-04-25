import Router from 'koa-router';
import { main as mainCtrl } from './main';

export function main(router: Router<any, {}>) {
  mainCtrl(router);
}
