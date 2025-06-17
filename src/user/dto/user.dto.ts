import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class UserDTO {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}