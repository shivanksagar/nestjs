import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';   

import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';   
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private uModel: Model<User>)   
 {}
  create(createUserDto: CreateUserDto) {
    return this.uModel.create(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.uModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


    async getUserByUsername(username: string) {
        return this.uModel.findOne({name: username}).then((user) => {
            return user;
        }).catch((error) => {error});
    }

    async hashPassword(password: string): Promise<string> {
      const saltOrRounds = 10; // Adjust the salt rounds as needed for security
      return bcrypt.hash(password, saltOrRounds);
    }
  
    async comparePassword(password: string, hash: string): Promise<boolean> {
      return bcrypt.compare(password, hash);   
  
    }

    findOneByEmail(email: string) {
        return this.uModel.findOne({email: email}).then((user) => {
            return user;
        }).catch((error) => {error});
    }

    findOneByUsername(username: string) {
        return this.uModel.findOne({name: username}).then((user) => {
            return user;
        }).catch((error) => {error});
    }
}
