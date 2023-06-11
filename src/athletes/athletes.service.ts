import { HttpException, Injectable } from '@nestjs/common';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Athlete } from './athlete.model';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AthletesService {
  private athletes: Athlete[] = [];

  constructor(
    @InjectModel('Athlete') private readonly athleteModel: Model<Athlete>   
  ) {}

  async create(name: string, sport: string) {
    const newAthlete = new this.athleteModel(
        {
          name,
          sport
        }
      );
    // .save() is an asynchronous method which is why it is wrapped in an async/await block.
    // .save returns an ID from the generated document.
    const newID = await newAthlete.save();
    return newID.id;
  }

  async findAll() {
    //Mongoose to find all documents in the Athlete collection.
    const athletes = await this.athleteModel.find().exec();
    return athletes.map((athlete) => ({
      id: athlete.id,
      name: athlete.name,
      sport: athlete.sport
    }));
  }

  async findOne(id: string){
    let athlete;
    
    try{
      athlete = await this.athleteModel.findById(id).exec();
    }catch(error){
      throw new HttpException('Could not find athlete.', 404);
    }

    if(!athlete){
      throw new HttpException('Could not find athlete.', 404);
    }
    
    return athlete;

  }

  async getSingleAthlete(id: string){
    const athlete = await this.findOne(id);
    return { id: athlete.id, name: athlete.name, sport: athlete.sport }
  }

  async update(id: string, name: string, sport: string) {

    let updatedAthlete = await this.findOne(id);
    console.log(updatedAthlete)

    if(name){
      updatedAthlete.name = name;
    }
    if(sport){
      updatedAthlete.sport = sport;
    }

    updatedAthlete.save()
  }

  async remove(id: string) {
    await this.athleteModel.deleteOne({_id: id}).exec();
  }
}
