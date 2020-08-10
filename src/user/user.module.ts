import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { CurrentUserMiddleware } from '../common/middlewares/current-user.middleware';
import { RequireAuthMiddleware } from '../common/middlewares/require-auth.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware, RequireAuthMiddleware)
      .forRoutes('/api/auth/edit');
  }
}
