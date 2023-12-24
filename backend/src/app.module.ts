import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import Config from './config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

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
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
