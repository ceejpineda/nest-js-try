import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AthletesService } from './athletes.service';

@Controller('athletes')
export class AthletesController {
  constructor(private readonly athletesService: AthletesService) {}

  @Post()
  async addNew(
    @Body('name') name: string, 
    @Body('sport') sport: string
  ){
    const generatedID = await this.athletesService.create(name, sport);
    return {id: generatedID};
  }

  @Get()
  findAll() {
    return this.athletesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.athletesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAthleteDto: UpdateAthleteDto) {
  //   return this.athletesService.update(+id, updateAthleteDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.athletesService.remove(+id);
  }
}
