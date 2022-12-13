import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from '../owners/owners.service';
import { Owner } from '../owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>, private ownersService: OwnersService) { }


  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); //newPet = new Pet(); new.name = input.name
    return this.petsRepository.save(newPet); // insert
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); // SELECT * pet
  }

  findOne(id: number): Promise<Pet> {
    // return this.petsRepository.findOne({ where: { id: id } });
    return this.petsRepository.findOneOrFail({ where: { id: id } });
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
