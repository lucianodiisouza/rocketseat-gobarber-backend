import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return res.status(201).json({ data, token });
});

export default sessionsRouter;
