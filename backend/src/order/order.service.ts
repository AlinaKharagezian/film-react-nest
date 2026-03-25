import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { FilmsRepository } from '../repository/films.repository';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async create(orderDto: OrderDto) {
    const items = [];

    for (const ticket of orderDto.tickets) {
      const film = await this.filmsRepository.findOne(ticket.film);
      const session = film?.schedule.find((s) => s.id === ticket.session);

      if (!session) throw new BadRequestException('Сеанс не найден');

      const seatLabel = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(seatLabel)) {
        throw new BadRequestException('Место уже занято');
      }

      session.taken.push(seatLabel);
      await this.filmsRepository.updateSchedule(ticket.film, film.schedule);

      const saved = await this.orderRepository.create({
        ...ticket,
        email: orderDto.email,
        phone: orderDto.phone,
      });
      items.push(saved);
    }

    return { total: items.length, items };
  }
}
