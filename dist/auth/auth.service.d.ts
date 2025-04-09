import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, SignInDto, AuthResponseDto } from './dto/auth.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<AuthResponseDto>;
    signIn(signInDto: SignInDto): Promise<AuthResponseDto>;
    getMe(id: string): Promise<any>;
}
