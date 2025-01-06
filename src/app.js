import Fastify from 'fastify';
import dotenv from 'dotenv';
import sequelize from '../config/database.js';
import userRoutes from './routes/userRoutes.js';
import bookCategoryRoutes from './routes/bookCategory.routes.js';
import bookRoutes from './routes/book.routes.js';

dotenv.config();
const fastify = Fastify({ logger: true });

fastify.register(userRoutes);
fastify.register(bookCategoryRoutes);
fastify.register(bookRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    await sequelize.sync();

    await fastify.listen({ port: process.env.PORT || 3000 });
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

startServer();
