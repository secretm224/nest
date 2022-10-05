import { IsString ,IsNumber, IsDate, IsOptional, validate, isString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



export class CreateGoodsDto
{
  @IsOptional()
  goods_no:number

  @IsOptional()
  @IsNumber()  
  goods_stat:number

  @ApiProperty({
    example:'상품명 입니다',
    description:'상품명',
    required:true,
  })

  @IsString()
  title:string;

  @ApiProperty({
    example:'영문 상품명 입니다',
    description:'영문 상품명',
    required:true,
  })

  @IsOptional()
  en_title:string;

  @ApiProperty({
    example:'중국 상품명 입니다',
    description:'중국 상품명',
    required:true,
  })

  @IsOptional()
  cn_title:string;

  @ApiProperty({
    example:'상품 상세',
    description:'상품 상세',
    required:true,
  })

  @IsString()
  detail:string;

  @ApiProperty({
    example:'영문 상품 상세',
    description:'상품 상세',
    required:true,
  })

  @IsOptional()
  en_detail:string;

  @ApiProperty({
    example:'중국 상품 상세',
    description:'상품 상세',
    required:true,
  })

  @IsOptional()
  cn_detail:string;

  @ApiProperty({
    example:'0',
    description:'금액',
    required:true,
  })

  @IsNumber()  
  amt:number;

  @IsOptional()
  en_amt:number;
  @IsOptional()
  cn_amt:number;

  @ApiProperty({
    example:'1',
    description:'수수료',
    required:true,
  })

  @IsNumber()  
  cms_rate:number;

  @IsOptional()
  reg_dt:Date;

  @ApiProperty({
    example:'관리자',
    description:'등록자 명',
    required:true,
  })

  @IsString()
  reg_id:string;

  @IsOptional()
  chg_dt:Date;

  @ApiProperty({
    example:'관리자',
    description:'변경자 명',
    required:true,
  })

  @IsOptional()
  chg_id:string;
}