export class AuthTokenResponseDto {
    acessToken: string;

    constructor(acessToken: string) {
        this.acessToken = acessToken;
    }
}