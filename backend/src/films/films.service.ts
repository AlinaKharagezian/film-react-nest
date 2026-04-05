import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    const items = await this.filmsRepository.findAll();
    return { total: items.length, items };
  }

  async findSchedule(id: string) {
    const film = await this.filmsRepository.findOne(id);
    const items = film ? film.schedule : [];
    return { total: items.length, items };
  }
}
