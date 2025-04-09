export declare class SignUpDto {
    email: string;
    password: string;
}
export declare class SignInDto {
    email: string;
    password: string;
}
export declare class AuthResponseDto {
    token: string;
    user: {
        id: string;
        email: string;
        role: string;
    };
}
