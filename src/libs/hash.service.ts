import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public getHashValue(value: string) {
    const saltRounds = 10;
    return bcrypt.hashSync(value, saltRounds);
  }
}
