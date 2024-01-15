import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// MongoDB
import { MongooseModule } from '@nestjs/mongoose';
// Config
import { ConfigModule } from '@nestjs/config';
import { StonesModule } from './components/stones/stones.module';

@Module({
     imports: [
          ConfigModule.forRoot({
               isGlobal: true,
               envFilePath: ['.env.development']
          }),
          MongooseModule.forRoot(process.env.MONGODB_URI, {
               dbName: process.env.DB_NAME
          }),
          StonesModule
     ],
     controllers: [AppController],
     providers: [AppService],
})
export class AppModule { }
