import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { Goods } from './listing/goods.listing';
import { Exclusion, Repository } from 'typeorm';
import{ GoodsData } from './entities/goods.entity';
import { Exception } from 'handlebars';

@Injectable()
export class GoodsService 
{
      constructor(@InjectRepository(GoodsData)
                 private GoodsRepository: Repository<GoodsData>,
                 ) {}
    
      findAll(): Promise<GoodsData[]> {
        return  this.GoodsRepository.find();
      }

      findOne(goods_no: number): Promise<GoodsData> {
        return this.GoodsRepository.findOne({where:{goods_no}});
      }

      findGoods(): Promise<GoodsData[]> {
        return this.GoodsRepository.find({where:{goods_stat:20}});
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

          let usd_rate = 1421.83;
          let obj_usd = await this.ExchangeService('USD');
          usd_rate = obj_usd.ttb.replaceAll(",","") as number;
          
          let chn_rate = 199.81;
          let obj_cny =  await this.ExchangeService('CNH');
          chn_rate = obj_cny.ttb as number;

          GoodsInfo.en_amt = usd_rate * GoodsInfo.amt;
          GoodsInfo.cn_amt = chn_rate * GoodsInfo.amt;
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
        if(!(stat == 10 || stat == 20 || stat == 30)){
          throw new Exception(
            '10:대기 , 20: 완료 , 30: 보류 의 상태로만 변경해주세요',
          );
        }

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
          const tr_text = result.data.message.result.translatedText;
          return tr_text;
      }

      async ExchangeService(currency_code:string):Promise<any>   
      {
        const year = new Date(Date.now()).getFullYear().toString();
        const month = new Date(Date.now()).getMonth()+1;
        const month_txt = month.toString();
        const date = new Date(Date.now()).getDate().toString().padStart(2, '0');
    
        const api_key = 'SnC0qRLUiIgO8K1qWMpAYwUwYtNfcKJ2';
        const param_date=`${year}${month_txt}${date}`;
    
        const url =`https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${api_key}&searchdate=${param_date}&data=AP01`
        const response = await axios.get(url);
        const Exchange_info = response.data.filter(e => e.cur_unit === currency_code);
        return Exchange_info[0];
     }
}
