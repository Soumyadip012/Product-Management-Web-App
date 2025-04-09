import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, AuthResponseDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto): Promise<AuthResponseDto> {
    return this.authService.signIn(signInDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@GetUser() user: User) {
    return this.authService.getMe(user.id);
  }
}
