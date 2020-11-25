import { getRepository } from 'typeorm';
import User from '../models/User'
import { compare } from 'bcryptjs'
import { id } from 'date-fns/esm/locale';


interface Request {
  email: string;
  password: string;
}
export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<{user:User}> {

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
    return {
      user,
    }

  };
}
