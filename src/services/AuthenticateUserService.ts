import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth'

import AppError from '../errors/AppError'
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email }

    })

    if (!user) {
      throw new AppError("incorret email/password combination", 401);
    }
    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError("incorret email/password combination", 401);
    }
    const { expiresIn, secret } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn
    });
    return {
      user,
      token
    }

  };
}
