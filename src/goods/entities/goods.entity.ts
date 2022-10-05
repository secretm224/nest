import { IsOptional, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoodsData {
  @PrimaryGeneratedColumn()
  goods_no:number;

  @Column({ default: 0 })
  goods_stat:number

  @IsString()
  @Column()
  title:string;

  @IsOptional()
  @Column({default:""})
  en_title:string;

  @IsOptional()
  @Column({default:""})
  cn_title:string;

  @IsString()
  @Column()
  detail:string;

  @IsOptional()
  @Column({default:""})
  en_detail:string;

  @IsOptional()
  @Column({default:""})
  cn_detail:string;

  @Column()
  amt:number;

  @Column({default:0})
  en_amt:number;

  @Column({default:0})
  cn_amt:number;

  @Column()
  cms_rate:number;

  @Column({default:()=>'NOW()'})
  reg_dt:Date;

  @Column()
  reg_id:string;

  @Column({default:()=>'NOW()'})
  chg_dt:Date;

  @Column()
  chg_id:string;
}
/*
goods_no auto
goods_stat number
title string
en_title string
cn_title string
detail string
en_detail string
cn_detail string
amt number
cms_rate number
reg_dt datetime
reg_id string
chg_dt datetime
chg_id string

*/