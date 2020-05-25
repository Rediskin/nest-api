import {ConnectionOptions} from "typeorm";


const config: ConnectionOptions = {
  type: 'mysql',
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: "nodejsserver",
  entities: [
      "./components/**/*.entities.ts"
  ],
  migrations: ["src/migrations/*.ts"],
  cli:{migrationsDir: "src/migrations"},
};

export = config;