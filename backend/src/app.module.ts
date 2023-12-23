import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import Config from './config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: Config.MAILER_TRANSPORT,
      defaults: {
        secure: true,
        from: Config.DEFAULT_FROM,
      }
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
