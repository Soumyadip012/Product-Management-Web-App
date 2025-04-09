import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, AuthResponseDto } from './dto/auth.dto';
import { User } from './user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<AuthResponseDto>;
    signIn(signInDto: SignInDto): Promise<AuthResponseDto>;
    getMe(user: User): Promise<any>;
}
