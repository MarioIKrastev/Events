import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import entities from './typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    SeedsModule,
  ],
  controllers: [],
  providers: [
    // provides reflector to AtGuard for using methods like `canActivate`
    // because AtGuard is global this method allows to ignore this guard for some routes
    // {
    //   provide: APP_GUARD,
    //   useClass: AtGuard,
    // },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
