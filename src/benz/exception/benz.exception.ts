import { ForbiddenException } from "@nestjs/common";

export class ForbiddenRoleException extends ForbiddenException{
    constructor(Role: string){
        super(`Forbidden ${Role}`);
    }
}