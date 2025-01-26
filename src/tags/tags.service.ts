import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createTagDto: CreateTagDto, userId: number): Promise<Tag> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tag = this.tagRepository.create({
      ...createTagDto,
      users: [user],
    });

    return this.tagRepository.save(tag);
  }

  async findAll(userId: number): Promise<Tag[]> {
    return this.tagRepository.find({
      where: { users: { id: userId } },
      relations: ['user', 'recipes'],
    });
  }

  async findOne(id: number, userId: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: ['user', 'recipes'],
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (!tag.users.some((u) => u.id === userId)) {
      throw new Error('Unauthorized');
    }

    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto, userId: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id }, relations: ['user'] });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (!tag.users.some((u) => u.id === userId)) {
      throw new Error('Unauthorized');
    }

    await this.tagRepository.update(id, updateTagDto);
    return this.tagRepository.findOne({ where: { id } });
  }

  async remove(id: number, userId: number): Promise<void> {
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: ['user', 'recipes'],
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (!tag.users.some((u) => u.id === userId)) {
      throw new Error('Unauthorized');
    }

    if (tag.recipes.length > 0) {
      await this.tagRepository
        .createQueryBuilder()
        .relation(Tag, 'recipes')
        .of(tag)
        .remove(tag.recipes);
    }

    await this.tagRepository.delete(id);
  }

}
