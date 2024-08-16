import { Body, Controller, Post , HttpException , HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { loginDto } from './dto/loginDto.dto';

@Controller('auth')
export class AuthController {

    constructor( private readonly authService: AuthService , private readonly userService: UserService) {}


    @Post('/login')
    async login(@Body() loginDto: loginDto) {
      try {
        const user = await this.authService.findOneByEmail(loginDto.email);
      
        if (user && await this.userService.comparePassword(loginDto.password, user.password)) {
          const userSignIn = await this.authService.signIn(user.name);
          return userSignIn;
        }else{
          throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        } 
      } catch (error) {
        // Handle authentication errors
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    }

    @Post('/register')
    async signup(@Body() createUserDto: CreateUserDto) {
      try {
        const existingUser = await this.userService.findOneByUsername(createUserDto.name);
        if (existingUser) {
          throw new HttpException('Username already exists', HttpStatus.CONFLICT);
        }
        const hashedPassword = await this.userService.hashPassword(createUserDto.password);
        createUserDto.password = hashedPassword;
        return await this.authService.signUp(createUserDto); // Await the result from the service
      } catch (error) {
        // Handle specific errors or general exceptions
        if (error.code === 11000) { // Assuming MongoDB duplicate key error
          throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        } else if (error instanceof HttpException) { // If it's already an HttpException, re-throw
          throw error;
        } else { // General error handling
          console.error('Error during signup:', error); // Log the error for debugging
          throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }


}
