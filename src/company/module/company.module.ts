import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { Company } from 'src/entities/company.entity';
import { CompanyController } from '../controller/company.controller';
import { User } from 'src/entities/user.entity';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';

@Module({ 
  
  imports: [TypeOrmModule.forFeature([Company,User])],
  providers: [TypeOrmModule,CompanyService,FirebaseAuthGuard], // Provide UsersService
  controllers: [CompanyController],
})
export class CompanyModule {}
