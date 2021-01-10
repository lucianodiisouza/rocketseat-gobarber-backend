import Router from 'express';
import CreateUserService from '../services/CreateUserService';
import { getCustomRepository } from 'typeorm';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createdUser = new CreateUserService();

    const user = await createdUser.execute({
      name,
      email,
      password,
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return res.json(userData);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
