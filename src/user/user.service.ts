import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginRequest, LoginResponse, SignupRequest } from './user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserErrorMessages } from './constants';
import { PreCheck } from '../libs/prechecker';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from '../shared/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  @PreCheck(['throwIfUserExists', 'checkPasswordEquals'])
  public async register(requestBody: SignupRequest) {
    const userEntity = this.repository.create(requestBody);
    await this.repository.save(userEntity);
  }

  private async throwIfUserExists({ username }: SignupRequest) {
    const user = await this.getUserWithUsername(username);
    if (user) {
      throw new HttpException(UserErrorMessages.UsernameAlreadyExists, HttpStatus.NOT_FOUND);
    }
  }

  private checkPasswordEquals({ password, verifyPassword }: SignupRequest) {
    if (password !== verifyPassword) {
      throw new HttpException(UserErrorMessages.PasswordsNotMatched, HttpStatus.FORBIDDEN);
    }
  }

  public async login(loginRequest: LoginRequest) {
    const user = await this.getUserWithUsername(loginRequest.username);
    if (!user) {
      this.throwLoginError();
    }

    await this.checkPasswordMatching(user!.password, loginRequest.password);

    const loginResponse = new LoginResponse();
    loginResponse.token = this.getJwt(user!);
    return loginResponse;
  }

  private getJwt(user: UserEntity) {
    return jwt.sign(
      { username: user.username, id: user.id },
      this.configService.get(EnvVariables.JwtSecret),
    );
  }

  private async checkPasswordMatching(userPassword: string, requestPassword: string) {
    const isPasswordsMatch = await bcrypt.compare(requestPassword, userPassword);
    if (!isPasswordsMatch) {
      this.throwLoginError();
    }
  }

  private throwLoginError() {
    throw new HttpException(UserErrorMessages.UsernameOrPasswordIsNotCorrect, HttpStatus.FORBIDDEN);
  }

  private async getUserWithUsername(username: string) {
    return await this.repository.findOne({
      where: {
        username: username,
      },
    });
  }
}
