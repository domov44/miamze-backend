import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { NotUniqueException } from '../exception/NotUniqueException';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const usernameExists = await this.userRepository.count({
      where: { username: createUserDto.username },
    });

    if (usernameExists > 0) {
      throw new NotUniqueException('Un utilisateur avec ce nom d\'utilisateur existe déjà');
    }

    const emailExists = await this.userRepository.count({
      where: { email: createUserDto.email },
    });

    if (emailExists > 0) {
      throw new NotUniqueException('Un utilisateur avec cet email existe déjà');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

    createUserDto.password = hashedPassword;

    const user = this.userRepository.create(createUserDto);

    await this.userRepository.insert(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto, currentUserId: number): Promise<User> {
    if (id !== currentUserId) {
      throw new ForbiddenException("You don't have permission to update this user.");
    }
    if (updateUserDto.password) {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    }
    
    if (updateUserDto.username) {
      const existingUser = await this.userRepository.findOne({
        where: { username: updateUserDto.username, id: Not(id) },
      });
      if (existingUser) {
        throw new ConflictException('Username already taken by another user');
      }
    }
    await this.userRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }
  
  async remove(id: number, currentUserId: number): Promise<void> {
    if (id !== currentUserId) {
      throw new ForbiddenException("You don't have permission to delete this user.");
    }
    const userExists = await this.userRepository.exist({ where: { id } });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
  }
}
