import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: unknown,
    optionalParams: unknown[],
  ) {
    const timestamp = new Date().toISOString();
    const cleanMessage = String(message).replace(/[\n\t]/g, ' ');
    let tskvLine = `tskv\ttime=${timestamp}\tlevel=${level}\tmessage=${cleanMessage}`;

    if (optionalParams && optionalParams.length > 0) {
      tskvLine += `\tparams=${JSON.stringify(optionalParams)}`;
    }
    return tskvLine;
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }
}
