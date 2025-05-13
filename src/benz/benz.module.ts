import { Module } from '@nestjs/common';
import { BenzService } from './benz.service';
import { BenzController } from './benz.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Benz } from './entities/benz.entity';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './guard/role.guard';

@Module({
  imports:[TypeOrmModule.forFeature([Benz]),

 JwtModule.register({
  global:true,
  secret: process.env.JWTSECRET,
  signOptions: { expiresIn: '1h'},
}),
  PassportModule.register({
  defaultStrategy:'jwt',
  session:true
})
],
  controllers: [BenzController],
  providers: [BenzService, JwtStrategy, RolesGuard],
  exports:[BenzService, PassportModule, JwtStrategy, TypeOrmModule],
})
export class BenzModule {}
