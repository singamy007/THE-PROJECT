import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const BookCategory = sequelize.define('BookCategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default BookCategory;
