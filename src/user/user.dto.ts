import { ApiProperty } from '@nestjs/swagger';

export class SignupRequest {
  @ApiProperty({ type: 'string', required: true, example: 'testUser' })
  public username: string;

  @ApiProperty({ type: 'string', required: true, example: 'veryStrong#password' })
  public password: string;

  @ApiProperty({ type: 'string', required: true, example: 'veryStrong#password' })
  public verifyPassword: string;
}
