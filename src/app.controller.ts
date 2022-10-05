import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { GoodsService } from './goods/goods.service';

@Controller()
export class AppController {
  constructor(private appService: AppService,private readonly httpService: HttpService) {}
}