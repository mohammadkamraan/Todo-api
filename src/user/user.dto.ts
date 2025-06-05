import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignupRequest {
  @ApiProperty({ type: 'string', required: true, example: 'testUser' })
  @IsNotEmpty()
  public username: string;

  @ApiProperty({ type: 'string', required: true, example: 'veryStrong#password' })
  @IsNotEmpty()
  public password: string;

  @ApiProperty({ type: 'string', required: true, example: 'veryStrong#password' })
  @IsNotEmpty()
  public verifyPassword: string;
}

export class LoginRequest {
  @ApiProperty({ type: 'string', required: true, example: 'testUser' })
  @IsNotEmpty()
  public username: string;

  @ApiProperty({ type: 'string', required: true, example: 'testPassword' })
  @IsNotEmpty()
  public password: string;
}

export class LoginResponse {
  public token: string;
}
