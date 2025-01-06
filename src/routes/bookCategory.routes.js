import BookCategory from '../models/bookCategory.model.js';

export default async function bookCategoryRoutes(fastify) {
  // Create Book Category
  fastify.post('/bookcategories', async (req, reply) => {
    try {
      const { name } = req.body;
      const existingCategory = await BookCategory.findOne({ where: { name } });
    if (existingCategory) {
      return reply.code(400).send({ error: 'category is already registered.' });
    }
      const category = await BookCategory.create({ name });
      reply.status(201).send(category);
    } catch (error) {
      reply.status(500).send({ error: 'category is already registered' });
    }
  });

  // Get All Book Categories
  fastify.get('/bookcategories', async (req, reply) => {
    try {
      const categories = await BookCategory.findAll();
      reply.status(200).send(categories);
    } catch (error) {
      reply.status(500).send({ error: 'Failed to fetch categories' });
    }
  });

  // Update Book Category
  fastify.put('/bookcategories/:id', async (req, reply) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      if (!name) {
        return reply.status(400).send({ error: 'Name is required' });
      }
  
      const category = await BookCategory.findByPk(id);
      if (!category) {
        return reply.status(404).send({ error: 'Category not found' });
      }
  
      category.name = name;
      await category.save();
  
      reply.status(200).send(category);
    } catch (error) {
      console.error('Error updating category:', error); // Log error to debug
     reply.status(500).send({ error: 'Failed to update category' });// happens when there is an error in the server
    }
    finally {
      console.log('Category updated successfully');
    }
  });

  // Delete Book Category
  fastify.delete('/bookcategories/:id', async (req, reply) => {
    try {
      const { id } = req.params;
      const category = await BookCategory.findByPk(id);
      if (!category) return reply.status(404).send({ error: 'Category not found' });
      await category.destroy();
      reply.status(200).send({ message: 'Category deleted successfully' });
    } catch (error) {
      reply.status(500).send({ error: 'Failed to delete category' });// happens when there is an error in the server
    }
  finally {
    console.log('Category deleted successfully');
  }
  });
}