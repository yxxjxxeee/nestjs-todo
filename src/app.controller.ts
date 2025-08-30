import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  home(): string {
    return 'Hello nestjs-todo!';
  }
}
