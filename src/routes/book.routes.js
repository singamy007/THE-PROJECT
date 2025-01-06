import Book from '../models/book.model.js';
import BookCategory from '../models/bookCategory.model.js';
import verifyToken from '../middleware/authMiddleware.js';

export default async function bookRoutes(fastify, opts) {
  // Create Book
  fastify.route({
    method: 'POST',
    url: '/books',
    preHandler: verifyToken,
    handler: async (req, reply) => {
      try {
        
        const { title, author, categoryId } = req.body;

        if (!title || !author || !categoryId) {
          return reply.status(400).send({ error: 'Missing required fields' });
        }

        const category = await BookCategory.findByPk(categoryId);
        if (!category) {
          return reply.status(404).send({ error: 'Category not found' });
        }

        const existingTitle = await Book.findOne({ where: { title } });
        if (existingTitle) {
          return reply.status(400).send({ error: 'Book is already registered.' });
        }

        const newBook = await Book.create({ title, author, categoryId });
        reply.status(201).send(newBook);
      } catch (error) {
        console.error('Error creating book:', error);
        reply.status(500).send({ error: 'Failed to create book' });
      }
    },
  });

  // Fetch all books
  fastify.route({
    method: 'GET',
    url: '/books',
    preHandler: verifyToken,
    handler: async (req, reply) => {
      try {
        
        const books = await Book.findAll({
          
          include: { model: BookCategory, as: 'category', attributes: ['id', 'name'] },
        });

        if (books.length === 0) {
          return reply.status(404).send({ error: 'No books found for this user' });
        }

        reply.status(200).send(books);
      } catch (error) {
        console.error('Error fetching books:', error);
        reply.status(500).send({ error: 'Failed to fetch books' });
      }
    },
  });

  // Update Book
  fastify.route({
    method: 'PUT',
    url: '/books/:id',
    preHandler: verifyToken,
    handler: async (req, reply) => {
      try {
        
        const { id } = req.params;
        const { title, author, categoryId } = req.body;

        const book = await Book.findOne({ where: { id } });
        if (!book) {
          return reply.status(404).send({ error: 'Book not found' });
        }

        if (categoryId) {
          const category = await BookCategory.findByPk(categoryId);
          if (!category) {
            return reply.status(404).send({ error: 'Category not found' });
          }
        }

        await book.update({ title, author, categoryId });
        reply.status(200).send(book);
      } catch (error) {
        console.error('Error updating book:', error);
        reply.status(500).send({ error: 'Failed to update book' });
      }
    },
  });

  // Delete Book
  fastify.route({
    method: 'DELETE',
    url: '/books/:id',
    preHandler: verifyToken,
    handler: async (req, reply) => {
      try {
        
        const { id } = req.params;

        const book = await Book.findOne({ where: { id } });
        if (!book) {
          return reply.status(404).send({ error: 'Book not found' });
        }

        await book.destroy();
        reply.status(204).send();
      } catch (error) {
        console.error('Error deleting book:', error);
        reply.status(500).send({ error: 'Failed to delete book' });
      }
    },
  });

  // Fetch Book by ID
  fastify.route({
    method: 'GET',
    url: '/books/:id',
    preHandler: verifyToken,
    handler: async (req, reply) => {
      try {
        
        const { id } = req.params;

        const book = await Book.findOne({
          where: { id },
          include: { model: BookCategory, as: 'category', attributes: ['id', 'name'] },
        });

        if (!book) {
          return reply.status(404).send({ error: 'Book not found' });
        }

        reply.status(200).send(book);
      } catch (error) {
        console.error('Error fetching book:', error);
        reply.status(500).send({ error: 'Failed to fetch book' });
      }
    },
  });
}
