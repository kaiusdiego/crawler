// auth/user.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: Omit<User, 'id'>): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
