import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

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

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.athletesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.athletesService.getSingleAthlete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body('name') name: string, @Body('sport') sport: string) {
    await this.athletesService.update(id, name, sport);
    return null;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.athletesService.remove(id);
    return null;
  }
  
}
