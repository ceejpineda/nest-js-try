import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async signIn(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if(user?.password !== password || user == undefined){
            throw new HttpException('Incorrect Credentials', 403);
        }

        const payload = { sub: user.userId, username: user.username };
        
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
