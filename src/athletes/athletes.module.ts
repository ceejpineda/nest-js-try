import { Module } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { AthletesController } from './athletes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AthleteSchema } from './athlete.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Athlete', schema: AthleteSchema }])],
  controllers: [AthletesController],
  providers: [AthletesService]
})
export class AthletesModule {}
