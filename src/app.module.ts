import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { NotesController } from './notes/notes.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '/enviroments/.env'
    }),
    NotesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/notes'),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, UserController , NotesController ],
  providers: [AppService ],
})
export class AppModule {}
