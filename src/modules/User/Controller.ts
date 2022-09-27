import { Response, Request, NextFunction } from 'express';
import { Controller, Post } from '@overnightjs/core';
import dayjs from 'dayjs';
import ms from 'ms';

import JwtService from '../../libs/jwt';
import UserDTO from './Dto';
import { userServiceInterface } from '../../types/interfaces/user_interface';
import env from '../../config/env';
import { statusCodeType } from '../../types/typeAliases/statusCode_type';
import { User } from './Entity';

@Controller(`${env.api_entry}/users`)
class UserController {
  userService;
  jwtService;
  statusCode;
  constructor(
    userService: userServiceInterface,
    jwtService: JwtService,
    statusCode: statusCodeType
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
    this.statusCode = statusCode;
  }

  createAndSendTokens = (user: User, res: Response, next: NextFunction) => {
    const accessTokens = this.jwtService.createAccessTokens(
      user.id,
      env.jwt_access_expires_in as unknown as number
    );
    const refreshToken = this.jwtService.createRefreshToken(
      user.id,
      env.jwt_refresh_expires_in as unknown as number
    );

    try {
      const refreshCookieOptions = {
        expires: new Date(
          dayjs().valueOf() +
            ms(env.jwt_refresh_expires_in as unknown as number)
        ),
        // sameSite: 'lax',
        httpOnly: true,
        secure: false,
        domain: 'localhost'
      };
      if (process.env.NODE_ENV === 'production') {
        // refreshCookieOptions.sameSite = "None";
        refreshCookieOptions.secure = true;
        refreshCookieOptions.domain = 'prasdev.site';
      }

      res.cookie('refreshToken', refreshToken, refreshCookieOptions);

      res.status(this.statusCode.OK).json({
        status: 'Success',
        data: { token: accessTokens, user: new UserDTO(user) }
      });
    } catch (err) {
      next(err);
    }
  };

  @Post('signup')
  signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.signUpUser({ ...req.body });

      res.status(this.statusCode.CREATED).json({
        status: 'Success',
        data: { user: new UserDTO(user) }
      });

      return user;
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
