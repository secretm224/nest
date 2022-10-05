import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodsModule } from './goods/goods.module';
import { GoodsData } from './goods/entities/goods.entity';
import { HttpModule } from '@nestjs/axios';


@Module({
          imports: [GoodsModule,
                    HttpModule,
                    TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: '127.0.0.1',
                    port: 3306,
                    username: 'goods',
                    password: 'tkfkdgo1!',
                    database: 'goods_db',
                // //entities: [__dirname + '/**/*.entity{.ts}'],
                    entities: [GoodsData],
                    synchronize: true,
                    }),
                    ],
          controllers: [AppController],
          providers: [AppService],
      })
export class AppModule {}
