import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator((date: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request?.user.id || null;
});
