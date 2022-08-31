/* eslint-disable @typescript-eslint/no-explicit-any */
import ms from 'ms';
import { accessToken, refreshToken } from '../types/typeAliases/jwt_type';

class JwtService {
  private jwt;
  private secret;
  constructor(jwt: any, secret: string) {
    this.jwt = jwt;
    this.secret = secret;
  }

  createAccessTokens = (
    data: string | number,
    accessExpiration: number
  ): accessToken => {
    const accessToken: string = this.jwt.sign({ data }, this.secret, {
      expiresIn: accessExpiration
    });

    const accessTokenRefreshInterval = parseInt(ms(accessExpiration)) - 60000;

    return { accessToken, accessTokenRefreshInterval };
  };

  createRefreshToken = (
    data: string | number,
    refreshExpiration: number
  ): refreshToken => {
    return this.jwt.sign({ data }, this.secret, {
      expiresIn: refreshExpiration
    });
  };
}

export default JwtService;
