import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm'
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private repo: Repository<Cliente>,
  ) {}

  async create(dto: CreateClienteDto) {
    const c = this.repo.create(dto);
    return this.repo.save(c);
  }

  findAll(q?: string) {
    if (q) {
      return this.repo.find({
        where: [
          { ruc_dni: Like(`%${q}%`) },
          { nombres: Like(`%${q}%`) },
          { email: Like(`%${q}%`) },
        ],
        order: { id: 'DESC'},
      })
    }
    return this.repo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: string) {
    const found = await this.repo.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Cliente no encontrado!`);
    }
    return found;
  }

  async update(id: string, dto: UpdateClienteDto) {
    const c = await this.findOne(id);
    Object.assign(c, dto);
    return this.repo.save(c);
  }

  async remove(id: string) {
    const c = await this.findOne(id);
    await this.repo.remove(c);
    return { ok: true};
  }
}
