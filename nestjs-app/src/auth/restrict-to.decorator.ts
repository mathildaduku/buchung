import { SetMetadata } from '@nestjs/common';

export const RestrictTo = (...roles: string[]) => SetMetadata('roles', roles);
