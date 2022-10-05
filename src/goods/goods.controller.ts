import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { GoodsService } from './goods.service';
import { Goods } from './listing/goods.listing';
import { Response } from 'express';
import{ GoodsData } from './entities/goods.entity';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiParam, ApiProperty, ApiBody, ApiExtraModels } from '@nestjs/swagger';


@ApiTags('Goods')
@Controller('goods')
export class GoodsController 
{
    constructor(private readonly GoodsService:GoodsService,private readonly httpService: HttpService){}

    @ApiResponse({
        status:200,
        description:'성공',

    })
    @ApiResponse({
        status:500,
        description:'서버 에러',
    })

    @ApiOperation({summary:'상품 전체 조회'})
    @Get("/all")
    findAll(): Promise<GoodsData[]> {
        return this.GoodsService.findAll();
    }
    
    @ApiOperation({summary:'상품 조회'})
    @Get(':goods_no')
    findOne(@Param('goods_no') goods_no: number): Promise<GoodsData>  {
        return this.GoodsService.findOne(goods_no);
    }

    @ApiOperation({summary:'상품 등록'})
    @ApiBody({description: "body:insert goods data", type: CreateGoodsDto })
    @Post()
    create(@Body() GoodsData:CreateGoodsDto){
        return this.GoodsService.create(GoodsData);
    }
    
    @ApiOperation({summary:'상품 수정'})
    @ApiBody({description: "body:update goods data"})
    @Put(':goods_no')
    update(@Param('goods_no')goods_no: number, @Body() goods_info){
        console.log('update_info'+goods_info);
         const edit_goods = this.GoodsService.update(goods_no, goods_info);
        return edit_goods;
    }

    @ApiOperation({summary:"상품 상태 변경 (0 검수요청/10 검수 대기/20 검수 완료/30 검수 보류) "})
    @Patch(':goods_no/:stat')
    EditStats(@Param('goods_no')goods_no:number,@Param('stat')stat:number){
        const status_goods = this.GoodsService.EditStat(goods_no, stat);
        return status_goods;
    }
  
}
