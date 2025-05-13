import { IsNotEmpty, IsString, IsOptional, IsEmail } from "class-validator"
import { Role } from "../enum/benz.role.enum"

export class CreateBenzDto {
    @IsNotEmpty()
    @IsString()
    firstName:string

    @IsNotEmpty()
    @IsString()
    lastName:string

    @IsNotEmpty()
    @IsEmail()
    Email:string

    @IsNotEmpty()
    @IsString()
    Password:string

    @IsOptional()
    role: Role
}
