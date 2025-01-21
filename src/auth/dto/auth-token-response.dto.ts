export class AuthTokenResponseDto {
    acess_token: string;

    constructor(acessToken: string) {
        this.acess_token = acessToken;
    }
}