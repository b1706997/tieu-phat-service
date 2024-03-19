import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const AuthUser = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext,
  ): { email: string; role: string } => {
    return ctx.switchToHttp().getRequest().user;
  },
);
export default AuthUser;
