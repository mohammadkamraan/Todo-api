import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupRequest } from './user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserErrorMessages } from './constants';
import { PreCheck } from '../libs/prechecker';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}

  @PreCheck(['checkIfUserExists', 'checkPasswordEquals'])
  public async register(requestBody: SignupRequest) {
    const userEntity = this.repository.create(requestBody);
    await this.repository.save(userEntity);
  }

  private async checkIfUserExists({ username }: SignupRequest) {
    const user = await this.repository.findOne({
      where: {
        username: username,
      },
    });
    if (user) {
      throw new HttpException(UserErrorMessages.UsernameAlreadyExists, HttpStatus.NOT_FOUND);
    }
  }

  private checkPasswordEquals({ password, verifyPassword }: SignupRequest) {
    if (password !== verifyPassword) {
      throw new HttpException(UserErrorMessages.PasswordsNotMatched, HttpStatus.FORBIDDEN);
    }
  }
}
