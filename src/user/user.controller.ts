import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginRequest, SignupRequest } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async register(@Body() body: SignupRequest) {
    return await this.userService.register(body);
  }

  public async login(@Body() body: LoginRequest) {}
}
