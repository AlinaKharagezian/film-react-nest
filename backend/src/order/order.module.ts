import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Schedule } from '../films/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
