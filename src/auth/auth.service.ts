import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, SignInDto, AuthResponseDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthResponseDto> {
    const { email, password } = signUpDto;

    // Check if user exists
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new ConflictException('Email already exists');
    }

    // Create user
    const user = this.userRepository.create({
      email,
      password,
    });

    await this.userRepository.save(user);

    // Generate JWT token
    const token = this.jwtService.sign({ id: user.id });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async signIn(signInDto: SignInDto): Promise<AuthResponseDto> {
    const { email, password } = signInDto;

    // Find user
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.jwtService.sign({ id: user.id });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getMe(id: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Remove password from response
    const { password, ...result } = user;
    return result;
  }
}
