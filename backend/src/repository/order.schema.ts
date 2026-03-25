import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop() film: string;
  @Prop() session: string;
  @Prop() daytime: string;
  @Prop() row: number;
  @Prop() seat: number;
  @Prop() price: number;
  @Prop() email: string;
  @Prop() phone: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
