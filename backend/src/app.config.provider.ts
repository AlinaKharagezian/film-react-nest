import { ConfigService } from '@nestjs/config';

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

export const configProvider = {
  provide: 'CONFIG',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): AppConfig => {
    return {
      database: {
        driver: configService.get<string>('DATABASE_DRIVER', 'mongodb'),
        url: configService.get<string>('DATABASE_URL'),
      },
    };
  },
};
