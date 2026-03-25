import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;

@Schema()
export class Schedule {
  @Prop() id: string;
  @Prop() daytime: string;
  @Prop() hall: number;
  @Prop() rows: number;
  @Prop() seats: number;
  @Prop() price: number;
  @Prop([String]) taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
export class Film {
  @Prop() id: string;
  @Prop() rating: number;
  @Prop() director: string;
  @Prop([String]) tags: string[];
  @Prop() title: string;
  @Prop() about: string;
  @Prop() description: string;
  @Prop() image: string;
  @Prop() cover: string;
  @Prop({ type: [ScheduleSchema], default: [] }) schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
