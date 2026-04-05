import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async findAll() {
    return this.filmRepository.find();
  }

  async findOne(id: string) {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
      order: {
        schedule: {
          daytime: 'ASC',
        },
      },
    });
  }
}
