import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';   
import { CompanyModule } from 'src/company/module/company.module';
import { Company } from 'src/entities/company.entity';  
import { AuthModule } from 'src/auth/module/auth.module';
import { UserModule } from 'src/user/module/user.module';
import { User } from 'src/entities/user.entity';
 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-still-wind-44047708.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'abjerry97',
      password: 'fo5uIkT4VQLi',
      database: 'company_record',
      entities: [ Company,User/* Add other entities from ProductsModule here */],
      synchronize: true,
      autoLoadEntities: true,
      ssl:true
    }), 
    CompanyModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
