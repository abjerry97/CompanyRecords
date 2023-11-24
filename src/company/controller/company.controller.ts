import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  SetMetadata,
  Delete,
  UnauthorizedException,
  Req,
  Put,
} from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { Company } from 'src/entities/company.entity';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { AllowedAdminGuard } from 'src/auth/guards/allowed-admin.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/all')
  @UseGuards(FirebaseAuthGuard)
  getCompanies(): Promise<Company[] | null> {
    return this.companyService.findAll();
  }

  @Get('/')
  @UseGuards(FirebaseAuthGuard)
  getUserCompany(@Req() req: any): Promise<Company | null> {
    if (req.user == null) {
      throw new UnauthorizedException('User not found');
    }
    return this.companyService.findOneByUser(req.user);
  }

  @Post('/compare')
  @UseGuards(AllowedAdminGuard)
  compareCompany(@Body() data: any): Promise<Boolean | null> {
    return this.companyService.compare(data.company1Id, data.company2Id);
  }
  @Get('/:userId')
  @UseGuards(AllowedAdminGuard)
  getUserCompanyById(@Param('userId') userId: string): Promise<Company | null> {
    return this.companyService.findOneByUserId(+userId);
  }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  //   @SetMetadata('public', true)
  createCompany(@Body() data: any, @Req() req: any): Promise<Company | null> {
    if (req.user == null) {
      throw new UnauthorizedException('User not found');
    }
    return this.companyService.create(data, req.user);
  }

  @Delete('/:companyId')
  @UseGuards(AllowedAdminGuard)
  deleteUser(@Param('companyId') companyId: string): Promise<void> {
    return this.companyService.remove(+companyId);
  }
  @Put('/:companyId')
  @UseGuards(AllowedAdminGuard)
  createAdmin(
    @Body() data: any,
    @Param('companyId') companyId: string,
  ): Promise<Company | null> {
    return this.companyService.updateCompany(+companyId, data);
  }
}
