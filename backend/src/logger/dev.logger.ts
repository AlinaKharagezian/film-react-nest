import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  log(message: unknown, context?: string) {
    super.log(`[DEV] ${message}`, context);
  }
}
