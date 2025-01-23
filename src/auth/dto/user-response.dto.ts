export class UserResponseDto {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;


    constructor(id: number, username: string) {
        this.id = id;
        this.username = username
    }
}