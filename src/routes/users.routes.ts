import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
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
    avatar: user.avatar,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return res.json(userData);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return res.json(userData);
  },
);

export default usersRouter;
