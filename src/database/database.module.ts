import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "config/typeorm";
import { Module } from "@nestjs/common";

@Module({
    imports: [
         ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(dataSourceOptions)
    ],
})
export class DatabaseModule {}