import { IsNotEmpty, IsString, IsEmail } from "class-validator"

export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    Email:string

    @IsNotEmpty()
    @IsString()
    Password:string
}