import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { GoodsData } from './entities/goods.entity';

@Module({
    imports: [HttpModule,TypeOrmModule.forFeature([GoodsData])],
    controllers:[GoodsController],
    providers:[GoodsService],
})
export class GoodsModule {}
