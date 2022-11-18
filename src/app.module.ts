import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      password: 'safepassword',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
