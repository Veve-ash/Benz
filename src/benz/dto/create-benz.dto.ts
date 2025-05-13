import { IsNotEmpty, IsString, IsOptional, IsEmail, IsStrongPassword } from "class-validator"
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
    @IsStrongPassword({ minLength:8, minLowercase:1, minUppercase:1, minNumbers:1, minSymbols:1 })
    Password:string

    @IsOptional()
    role: Role
}
