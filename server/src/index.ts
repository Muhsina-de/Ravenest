import { createServer, startServer } from './server';

const app = createServer();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;    

let server;
if (process.env.NODE_ENV !== 'test') {
  server = startServer(app, port);
}

export { app, server };