import { getRepository } from 'typeorm';
import User from '../models/User'
import { compare } from 'bcryptjs'
import {sign} from 'jsonwebtoken';

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

    const token = sign({},'d0abd95e990a406fceb35810bc39433b',{
      subject: user.id,
      expiresIn: '1d'
    });
    return {
      user,
      token
    }

  };
}
