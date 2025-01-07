import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import BookCategory from './bookCategory.model.js';

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  
}, {
  
  timestamps: true,
});




// Relationships
Book.belongsTo(BookCategory, { foreignKey: 'categoryId', as: 'category' });//category means the name of the relationship
BookCategory.hasMany(Book, { foreignKey: 'categoryId', as: 'books' });

export default Book;
