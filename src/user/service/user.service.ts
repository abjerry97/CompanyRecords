import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (!users || users.length < 1)
      throw new HttpException(
        {
          message: 'User not found, or already deleted',
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );

    return users;
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: +id });
    if (!user)
      throw new HttpException(
        {
          message: 'User not found, or already deleted',
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async findOneByUid(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ uid: id });
    // if (!user)
    //   throw new HttpException(
    //     {
    //       message: 'User not found, or already deleted',
    //       statusCode: HttpStatus.NOT_FOUND,
    //     },
    //     HttpStatus.NOT_FOUND,
    //   );
    return user;
  }

  async createAdmin(id: number, role): Promise<User | null> {
    let user = await this.userRepository.findOneBy({ id: id });
    if (!user)
      throw new HttpException(
        {
          message: 'User not found, or already deleted',
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    if (!user.roles.includes(role)) user.roles.push(role);
    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      // Handle errors, e.g., unique constraint violation
      throw new HttpException(
        {
          message: 'Failed to update user',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, data): Promise<User | null> {
    let user = await this.userRepository.findOneBy({ id: id });
    if (!user)
      throw new HttpException(
        {
          message: 'User not found, or already deleted',
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );

    Object.assign(user, data);

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      // Handle errors, e.g., unique constraint violation
      throw new HttpException(
        {
          message: 'Failed to update user',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: any) {
    let existingUser = await this.userRepository.findOneBy({ uid: data?.uid });
    if (existingUser)
      throw new HttpException(
        {
          message: 'User already exist',
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
      );
    let user = this.userRepository.create({
      ...data,
      createdAt: new Date(),
    });
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }
}
