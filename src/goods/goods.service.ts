import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { Goods } from './listing/goods.listing';
import { Repository } from 'typeorm';
import{ GoodsData } from './entities/goods.entity';

@Injectable()
export class GoodsService 
{
      //private GoodsList:Goods[] = [];
      //constructor(private readonly httpService: HttpService) {}
      constructor(@InjectRepository(GoodsData)
                 private GoodsRepository: Repository<GoodsData>,
                 //private readonly httpService: HttpService
                 ) {}
    
      findAll(): Promise<GoodsData[]> {
        console.log('service'+this.GoodsRepository.find());
        return  this.GoodsRepository.find();
      }

      findOne(goods_no: number): Promise<GoodsData> {
        return this.GoodsRepository.findOne({where:{goods_no}});
      }

      //등록
      async create(GoodsInfo: GoodsData): Promise<string>
      {
         if(GoodsInfo.title){
           const en_title_txt = await this.PaPagoService(GoodsInfo.title,"en");
           GoodsInfo.en_title =  en_title_txt as unknown as string
           const cn_title_txt = await this.PaPagoService(GoodsInfo.title,"zh-CN");
           GoodsInfo.cn_title = cn_title_txt as unknown as string
         }

         if(GoodsInfo.detail){
          const en_detail_txt = await this.PaPagoService(GoodsInfo.detail,"en");
          GoodsInfo.en_detail =  en_detail_txt as unknown as string
          const cn_detail_txt = await this.PaPagoService(GoodsInfo.detail,"zh-CN");
          GoodsInfo.cn_detail = cn_detail_txt as unknown as string
         }

         if(GoodsInfo.amt)
         {
          const en = 1421.83;
          const cn = 199.81;

          GoodsInfo.en_amt = en * GoodsInfo.amt;
          GoodsInfo.cn_amt = cn * GoodsInfo.amt;
         }

        const insert = await this.GoodsRepository.save(GoodsInfo);
        if(insert){
          return 'success'
        }else{
          return 'failed'
        }
      }

      //수정
      async update(goods_no: number, goods: GoodsData): Promise<GoodsData> 
      {
         const existGoods = await this.GoodsRepository.findOne({where:{goods_no}});
         if(existGoods)
         {
            existGoods.title = goods.title;
            existGoods.en_title = goods.en_title;
            existGoods.cn_title = goods.cn_title;
            existGoods.amt = goods.amt;
            existGoods.cms_rate = goods.cms_rate;
            existGoods.detail = goods.detail;
            existGoods.en_detail = goods.en_detail;
            existGoods.cn_detail = goods.cn_detail;
            existGoods.chg_dt = new Date(Date.now());
            existGoods.chg_id = 'EditService';
            const edit =  await this.GoodsRepository.save(existGoods);
            return edit;
         }
      }

      async EditStat(goods_no: number, stat: number): Promise<GoodsData> 
      {
         const existGoods = await this.GoodsRepository.findOne({where:{goods_no}});
         if(existGoods)
         {
            existGoods.goods_stat = stat;
            existGoods.chg_dt = new Date(Date.now());
            existGoods.chg_id = 'EditService';
            const edit =  await this.GoodsRepository.save(existGoods);
            return edit;
         }
      }

      async delete(goods_no: number): Promise<void> 
      {
        const existGoods = await this.GoodsRepository.findOne({where:{goods_no}});
        await this.GoodsRepository.delete(existGoods);
      }

      async PaPagoService(gd_nm:string ,target_len:string ):Promise<string> 
      {
          const Config = {
              headers: {
              'Content-Type': 'application/json',
              'X-Naver-Client-Id': 'HlCLyTjrnZc3MGofz8vw',
              'X-Naver-Client-Secret': 'fdL4v6F8bJ'
              }
          };

          const data = JSON.stringify({ source: 'ko',target:target_len,text:gd_nm });
          const result =  await axios.post('https://openapi.naver.com/v1/papago/n2mt', data, Config);

          console.log('papago data'+result.data.message.result.translatedText);

          const tr_text = result.data.message.result.translatedText;
          return tr_text;
      }
}
