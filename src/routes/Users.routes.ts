import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import {hash} from 'bcryptjs'
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const {name, email, password} = request.body;
    const createUser = new CreateUserService();
    const hashedPassword = await hash(password, 8)
    const user = await createUser.execute({name, email, password:hashedPassword});

    return response.json({ ...user, password: undefined });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
