import { Module } from '@nestjs/common';
import { BenzModule } from './benz/benz.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule, BenzModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
