import { ConfigService } from "@nestjs/config";
import { config } from 'dotenv';
import { Benz } from "src/benz/entities/benz.entity";
import { DataSourceOptions, DataSource } from "typeorm";

config();
 
const configService = new ConfigService();
 
export const dataSourceOptions: DataSourceOptions=({
  type: 'mysql',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_NAME'),
  entities: ['dist//*.entity.js', Benz],
  migrations: ['dist/config/migrations/*.js'],
  synchronize:true
});
const dataSource = new DataSource(dataSourceOptions)
export default dataSource;