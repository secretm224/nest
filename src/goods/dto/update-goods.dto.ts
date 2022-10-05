import { IsString ,IsNumber} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";
import { CreateGoodsDto } from "./create-goods.dto";

export class UpdateGoodsDto extends PartialType(CreateGoodsDto){

}

/*
{
    @IsString()    
    readonly title?:string;
    @IsNumber()    
    readonly stat?:number;
    //@IsString({each:true})
}
*/