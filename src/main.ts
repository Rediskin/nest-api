import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import connectToDatabase from "./loaders/database";
// import { authenticate } from './middleware/authenticate';
const dotenv = require('dotenv');

async function loadServer() {
  dotenv.config();
  await connectToDatabase();
  const app = await NestFactory.create(AppModule);
  // app.use(authenticate());
  await app.listen(3000);
}
loadServer();
