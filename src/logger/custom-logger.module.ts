import { Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

@Module({
  providers: [
    {
      provide: CustomLoggerService,
      useValue: new CustomLoggerService(),
    },
  ],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
