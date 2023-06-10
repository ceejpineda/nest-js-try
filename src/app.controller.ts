import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(): string {
    return this.appService.getTest();
  }

  // http://localhost:3000/test2 will return "Test2" in the browser window when the server is running 
  @Get('/test2')
  getTest2(): string {
    return this.appService.getTest2();
  }

  @Get('/test3')
  getTest3(): string {
    return this.appService.getTest3();
  }


}
