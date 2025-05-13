import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { BenzService } from "../benz.service";
import { ForbiddenRoleException } from "../exception/benz.exception";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector: Reflector, private benzService: BenzService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
       const roles = this.reflector.get<string[]>('roles', context.getHandler());
       //if (!roles) return true;

       const request = context.switchToHttp().getRequest();

       if (request?.user){
        const headers:Headers = request.headers;
        const user = await this.benzService.user(headers);

        if (!roles.includes((await user).role)){
            throw new ForbiddenRoleException(roles.join(' or '));
        }
        return true;
       }
       return false;
    }
}