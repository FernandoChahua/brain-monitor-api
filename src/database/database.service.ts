/* eslint-disable require-await */
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config-env/config';
import { ConnectionOptions } from 'typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [],
    inject: [config.KEY],
    async useFactory(configService: ConfigType<typeof config>) {
      console.log(process.cwd());
      return {
        ssl: false,
        type: 'postgres',
        host: configService.database.host,
        username: configService.database.user,
        password: configService.database.password,
        database: configService.database.name,
        entities: [`${process.cwd()}/dist/**/*.entity{.ts,.js}`],
        migrations: [`${process.cwd()}/dist/database/migrations/*{.ts,.js}`],

      } as ConnectionOptions;
    },
  }),
];
