import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAdminController } from './controllers/admin.auth.controller';
import { AuthUserController } from './controllers/user.auth.controller';
import { UserController } from './controllers/user.controller';
import { User } from './entities/User.entity';
import { UserService } from './services/user.service';
import { AuthModule as AuthUserModule } from './userAuth/auth.user.module';
import { AuthModule as AuthAdminModule } from './adminAuth/auth.admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthUserModule),
    forwardRef(() => AuthAdminModule),
  ],
  controllers: [UserController, AuthUserController, AuthAdminController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
