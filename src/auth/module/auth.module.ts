 import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'; 
import { FirebaseAuthStrategy } from '../strategies/firebase-auth.strategy';
import { FirebaseService } from '../services/firebase.service';
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';
import { UserModule } from 'src/user/module/user.module';
import { UserService } from 'src/user/service/user.service';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllowedAdminGuard } from '../guards/allowed-admin.guard';
@Module({
  imports: [TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'firebase-auth' }),UserModule,
  ],

  
  providers: [FirebaseAuthStrategy, FirebaseAuthGuard, FirebaseService,UserService], 
  exports: [FirebaseAuthGuard, FirebaseService]
})
export class AuthModule {}
