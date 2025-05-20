import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginRequest, SignupRequest } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async register(@Body() body: SignupRequest) {
    return await this.userService.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() body: LoginRequest) {
    return await this.userService.login(body);
  }
}
