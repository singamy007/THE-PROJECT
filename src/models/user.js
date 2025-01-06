import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  paranoid: true, // Enable soft deletes
  timestamps: true,
});

export default User;
