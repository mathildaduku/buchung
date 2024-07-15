import { Module } from '@nestjs/common';
import { ApiFeatures } from './api-features.util';
import { AppError } from './app-error.util';
import { SendEmail } from './send-email.util';

@Module({
  providers: [ApiFeatures, AppError, SendEmail],
  exports: [ApiFeatures, AppError, SendEmail],
})
export class UtilsModule {}
