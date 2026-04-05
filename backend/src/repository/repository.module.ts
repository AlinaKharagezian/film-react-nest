import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './films.schema';
import { Order, OrderSchema } from './order.schema';
import { FilmsRepository } from './films.repository';
import { OrderRepository } from './order.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Film.name, schema: FilmSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [FilmsRepository, OrderRepository],
  exports: [FilmsRepository, OrderRepository],
})
export class RepositoryModule {}
