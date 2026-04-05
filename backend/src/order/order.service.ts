import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../films/entities/schedule.entity';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async create(orderDto: OrderDto) {
    return await this.dataSource.transaction(async (manager) => {
      const scheduleRepo = manager.withRepository(this.scheduleRepository);
      const items = [];

      for (const ticket of orderDto.tickets) {
        const session = await scheduleRepo.findOne({
          where: { id: ticket.session },
        });

        if (!session) {
          throw new NotFoundException('Сеанс не найден');
        }

        const seatLabel = `${ticket.row}:${ticket.seat}`;

        if (session.taken.includes(seatLabel)) {
          throw new BadRequestException('Место уже занято');
        }

        session.taken.push(seatLabel);
        await scheduleRepo.save(session);

        items.push({
          film: ticket.film,
          session: ticket.session,
          daytime: ticket.daytime,
          row: ticket.row,
          seat: ticket.seat,
          price: ticket.price,
          email: orderDto.email,
          phone: orderDto.phone,
        });
      }

      return { total: items.length, items };
    });
  }
}
