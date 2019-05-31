import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  async getData() {
    let count = 0;
    const collection = [];

    do {
      const result = await this.appService.getData();
      collection.push(result);
      count++;
    } while (count < 2);

    return collection;
  }
}
