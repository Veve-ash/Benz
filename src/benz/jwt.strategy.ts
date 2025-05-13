import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { BenzService } from "./benz.service";
import { Benz } from "./entities/benz.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor( private benzService: BenzService, private configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWTSECRET'),
            passReqToCallback:true,
        });
    }

    async validate(data: {Email}):Promise<Benz>{
        const {Email} = data;
        const user = await this.benzService.findEmail(Email);
        if(!user){
            throw new UnauthorizedException('login to access endpoints')
        }
        return user;
    }
}