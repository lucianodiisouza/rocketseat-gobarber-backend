import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user } = await authenticateUserService.execute({
      email,
      password,
    });

    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return res.status(201).json(sessionData);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
