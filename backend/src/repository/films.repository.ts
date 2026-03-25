import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './films.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll() {
    return this.filmModel.find({}).exec();
  }

  async findOne(id: string) {
    return this.filmModel.findOne({ id }).exec();
  }

  async updateSchedule(filmId: string, schedule: any) {
    return this.filmModel.updateOne(
      { id: filmId },
      { $set: { schedule: schedule } },
    );
  }
}
