import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// Auth
import { AuthModule } from './components/auth/auth.module';
// MongoDB
import { MongooseModule } from '@nestjs/mongoose';
// Config
import { ConfigModule } from '@nestjs/config';
import { CrystalModule } from './components/crystal/crystal.module';
// Middleware
import { GetUserMiddleware } from './components/middleware/user.middleware';

@Module({
     imports: [
          ConfigModule.forRoot({
               isGlobal: true,
               envFilePath: ['.env.development']
          }),
          AuthModule,
          MongooseModule.forRoot(process.env.MONGODB_URI, {
               dbName: process.env.DB_NAME
          }),
          CrystalModule
     ],
     controllers: [],
     providers: [],
})
export class AppModule {
     configure(consumer: MiddlewareConsumer) {
          consumer
               .apply(GetUserMiddleware)
               .exclude(
                    { path: 'auth/signup', method: RequestMethod.POST },
                    { path: 'auth/signin', method: RequestMethod.POST },
               )
               .forRoutes('*');
     }
}
