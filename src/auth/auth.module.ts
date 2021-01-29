import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'jwt-secret-key',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService, JwtStrategy],
})
export class AuthModule {}
