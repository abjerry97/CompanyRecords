import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserController } from '../controller/user.controller';
import { AllowedAdminGuard } from 'src/auth/guards/allowed-admin.guard';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';

@Module({ 
  imports: [TypeOrmModule.forFeature([User]),],
  providers: [TypeOrmModule,UserService,FirebaseAuthGuard], // Provide UsersService
  controllers: [UserController,],
})
export class UserModule {}
  