import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AppService, IBody } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Body() body: IBody): Promise<any> {
    
    await this.appService.getHello(body)
    return { message: 'Hello api is up!! 🎇🎆🎇'};;
  }

}
