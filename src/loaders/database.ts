import {createConnection } from "typeorm";
import { User } from '../components/user/user.entities';


export default async function (): Promise<any>{
  await createConnection({
    type: 'mysql',
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "root",
    database: "nodejsserver",
    entities: [
      User,
    ]
  });
  console.log("Connected to database");
}