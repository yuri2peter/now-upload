import { startKoa } from './startKoa';
import { PORT } from './configs';

async function main() {
  const server = startKoa();

  server.listen(PORT, () => {
    console.log('listening on port:' + PORT);
  });
}
main();
