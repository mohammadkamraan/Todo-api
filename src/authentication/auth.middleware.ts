import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from '../shared/constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  public async use(req: any, res: any, next: (error?: any) => void): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const verifiedToken = await jwt.verify(token, this.configService.get(EnvVariables.JwtSecret));
      if (verifiedToken) req.user = verifiedToken;
    }
    next();
  }
}
