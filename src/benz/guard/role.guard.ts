// import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { BenzService } from "../benz.service";
// import { ForbiddenRoleException } from "../exception/benz.exception";

// @Injectable()
// export class RolesGuard implements CanActivate{
//     constructor(private readonly reflector: Reflector, private benzService: BenzService){}

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//        const roles = this.reflector.get<string[]>('roles', context.getHandler());
//        //if (!roles) return true;

//        const request = context.switchToHttp().getRequest();

//        if (request?.user){
//         const headers:Headers = request.headers;
//         let user = await this.benzService.user(headers);
//         console.log('user',user)

//         if (!roles.includes((await user).role)){
//             throw new ForbiddenRoleException(roles.join(' or '));
//         }
//         return true;
//        }
//        return false;
//     }
// }

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { BenzService } from "../benz.service";
import { ForbiddenRoleException } from "../exception/benz.exception";


@Injectable()
export class RolesGuard implements CanActivate{
constructor (private reflector:Reflector,private benzService:BenzService){}
// A service that allows access to metadata attached to route handlers (such as the roles allowed to access a route).

 async canActivate(context: ExecutionContext):Promise<boolean> {
  const roles=this.reflector.get<string[]>('roles',context.getHandler()); //The roles variable retrieves the roles metadata attached to the route handler (the function that will handle the request).
  console.log('roles',roles)
  const request = context.switchToHttp().getRequest(); //The request object represents the incoming HTTP request. It contains information like headers, the current user, and other request-related data.
  if(request?.user){
   const headers:Headers=request.headers;
  let user = this.benzService.user(headers);
  console.log('user',user)
   // The code fetches the request headers and calls the userService.user(headers) method to retrieve the current user's details, such as their role.
  
   if (!roles.includes((await user).role)) {
   throw new ForbiddenRoleException(roles.join(' or '));
  }
  return true; // This line checks if the user's role (retrieved from the userService) is included in the list of roles allowed to access this route.
  }
  return false; //If the user's role is not in the list, it throws a ForbiddenRoleException, effectively denying access to the route
}}