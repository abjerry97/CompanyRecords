import { UserRoleType } from './../../interfaces/user-role.interface';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { UserService } from '../service/user.service';
import { User } from './../../entities/user.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Delete,
  UnauthorizedException,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AllowedAdminGuard } from 'src/auth/guards/allowed-admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  @UseGuards(AllowedAdminGuard)
  getUsers(): Promise<User[] | null> {
    return this.userService.findAll();
  }

  @Get('/profile')
  @UseGuards(FirebaseAuthGuard)
  getUserProfile(
    @Req() req: any, 
  ): Promise<User | null> {
    if (req.user == null) {
      throw new UnauthorizedException('User not found');
    }
    return this.userService.findOne(req.user.id);
  }


  @Get('/:userId')
  @UseGuards(AllowedAdminGuard)
  getUser(@Param('userId') userId: string): Promise<User | null> {
    return this.userService.findOne(userId);
  }
  @Delete('/:userId')
  @UseGuards(AllowedAdminGuard)
  deleteUser(@Param('userId') userId: string): Promise<User | null> {
    return this.userService.remove(+userId);
  }
  @Put('/:userId')
  createAdmin(@Param('userId') userId: string): Promise<User | null> {
    return this.userService.createAdmin(+userId, 'admin');
  }
 
}
