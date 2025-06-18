import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(USER.name) private readonly userModel: Model<IUser>){}


    async hashPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async create(userDTO: UserDTO): Promise<IUser>{

        const hash = await this.hashPassword(userDTO.password);
        const newUser = new this.userModel({...userDTO, password: hash});
        return await newUser.save();
    }

    async findAll(): Promise<IUser[]>{
        return await this.userModel.find().exec();
    }

    async findById(id: string): Promise<IUser>{
        const user = await this.userModel.findById(id).exec();
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }   
}
