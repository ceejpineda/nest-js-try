import { Controller, HttpCode, Post, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){};

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>){
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
    
}
