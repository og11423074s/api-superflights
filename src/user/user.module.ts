import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { USER } from 'src/common/models/models';

@Module({
  imports: [MongooseModule.forFeature([{
    name: USER.name,
    schema: UserSchema,
  }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
