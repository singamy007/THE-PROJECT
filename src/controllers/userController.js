import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// User Signup
export const signup = async (req, reply) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return reply.code(400).send({ error: 'Name, email, and password are required.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return reply.code(400).send({ error: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return reply.code(201).send({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.error('Error during signup:', error);
    return reply.code(500).send({ error: 'Failed to register user.' });
  }
};

// User Signin
export const signin = async (req, reply) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return reply.code(400).send({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return reply.code(401).send({ error: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.code(401).send({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return reply.code(200).send({ token });
  } catch (error) {
    console.error('Error during signin:', error);
    return reply.code(500).send({ error: 'Failed to authenticate user.' });
  }
};

// User Signout (Token invalidation handled on client-side)
export const signout = async (req, reply) => {
  return reply.code(200).send({ message: 'Signed out successfully.' });
};
