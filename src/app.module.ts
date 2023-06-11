import { Module, NotFoundException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AthletesController } from './athletes/athletes.controller';
import { AthletesModule } from './athletes/athletes.module';
import { APP_FILTER } from '@nestjs/core';

/*
  Documentation: CJ PINEDA
  This is the root module of the application. It is the starting point Nest uses to build the application graph.
  MongooseModule.forRoot() method connects the application to the database. Find the connection string in the MongoDB Atlas dashboard.
*/

@Module({
  imports: [AthletesModule, MongooseModule.forRoot(`mongodb+srv://cjnest:a5fQRfA1qFkdK9pR@cluster0.vxcqnga.mongodb.net/?retryWrites=true&w=majority`)],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: NotFoundException
  }],
})
export class AppModule {}
