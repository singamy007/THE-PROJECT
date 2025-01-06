import { signup, signin, signout } from '../controllers/userController.js';

export default async function userRoutes(fastify) {
  fastify.post('/signup', signup);
  fastify.post('/signin', signin);
  fastify.post('/signout', signout);
}
