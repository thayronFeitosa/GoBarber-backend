import { getRepository } from 'typeorm';
import User from '../models/User'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth'

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
      throw new Error("incorret email/password combination");
    }
    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new Error("incorret email/password combination");
    }
    const { expiresIn,secret} = authConfig.jwt;
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
