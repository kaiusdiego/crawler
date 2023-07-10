// auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { RegisterDto, LoginDto } from './dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = { username, password: hashedPassword };
    return this.userService.create(user);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = this.jwtService.sign({ username });
      return { token };
    }
    throw new Error('Invalid username or password');
  }
}
