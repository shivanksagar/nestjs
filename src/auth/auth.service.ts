import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto} from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(private usersService: UserService , 
                private jwtService: JwtService
    ) {}

    async signIn(username: string): Promise<any> {
        const user = await this.usersService.getUserByUsername(username);

        if (!user) {
            return null;
        }
      
        const payload = { id: user._id, username: user.name };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }

    async signUp(CreateUserDto): Promise<any> {
        return this.usersService.create(CreateUserDto);
    }

    async findOneByEmail(email: string): Promise<any> {
        return this.usersService.findOneByEmail(email);
    }
    
}
