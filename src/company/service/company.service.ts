import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find({
      // relations: ['user'],
    });
  }

  async findOneByUser(user): Promise<Company> {
    return await this.companyRepository.findOneBy({ user: { id: user.id } });
  }
  async findOneByUserId(userId): Promise<Company> {
    return await this.companyRepository.findOneBy({ user: { id: +userId } });
  }

  findOne(sku: string): Promise<Company | null> {
    return null;
  }
  async create(data: any, user) {
    let company = await this.companyRepository.findOneBy({
      user: { id: user.id },
    });
    if (company) {
      throw new HttpException(
        { message: 'Company already exist' },
        HttpStatus.FORBIDDEN,
      );
    }
    let calculatedPercentage;
    if (
      !isNaN(+data.numberOfUsers) &&
      !isNaN(+data.numberOfProducts) &&
      +data.numberOfProducts > 0
    )
      calculatedPercentage =
        (+data.numberOfUsers / +data.numberOfProducts) * 100;
    company = new Company();
    company.name = data.name;
    company.companyLogo = data.companyLogo;
    // Assign the user to the company
    company.user = user.id;
    company.numberOfProducts = data.numberOfProducts;
    company.numberOfUsers = data.numberOfUsers;
    company.percentage = calculatedPercentage;
    // Set other properties in 'company' as needed

    // Save the user to update the association with the new company

    // Save the new company entity
    return await this.companyRepository.save(company);
  }


  async updateCompany(id: number,data): Promise<Company | null> {
    let company = await this.companyRepository.findOneBy({ id: id });
    if (!company)
      throw new HttpException(
        {
          message: 'Company not found, or already deleted',
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      ); 

      const newCompany = Object.assign(company,data)
    try {
      await this.companyRepository.save(newCompany);
      return company;
    } catch (error) { 
      throw new HttpException(
        {
          message: 'Failed to update company',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async compare (company1Id:number, company2Id:number): Promise<Boolean | null>{

   let company1 = await this.companyRepository.findOneBy({ id: company1Id });
    if (!company1)
      throw new HttpException(
        {
          message: `Company with id ${company1Id}not found, or already deleted`,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      ); 


      let company2 = await this.companyRepository.findOneBy({ id: company2Id });
      if (!company2)
        throw new HttpException(
          {
            message: `Company with id ${company2Id}not found, or already deleted`,
            statusCode: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        ); 
  
    return company1.percentage == company2.percentage
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
