import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user.module';
import { AuthAdminService } from './auth.admin.service';
import { jwtConstants } from './constants';
import { JwtAdminStrategy } from './jwt.strategy';
import { LocalAdminStrategy } from './local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expired },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthAdminService, LocalAdminStrategy, JwtAdminStrategy],
  exports: [AuthAdminService],
})
export class AuthModule {}
