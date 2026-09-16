// Yeh file ab MongoDB se connect hokar kaam karegi.
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/dbConnect'; // Database connection utility
import User from '../../../models/user';       // User model

// --- SECRET KEY ---
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key-for-development';

export async function POST(request) {
  try {
    // Database se connect karo
    await dbConnect();

    const body = await request.json();
    const { action, name, email, password } = body;

    // --- SIGNUP LOGIC ---
    if (action === 'signup') {
      if (!name || !email || !password) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
      }

      // Check if user already exists (in MongoDB)
      const userExists = await User.findOne({ email });
      if (userExists) {
        return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
      }

      // Hash the password for security
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save new user (in MongoDB)
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      return NextResponse.json({ message: 'Signup successful! Please login.' }, { status: 201 });
    }

    // --- LOGIN LOGIC ---
    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
      }

      // Find user in database (in MongoDB)
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }

      // Compare passwords
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }

      // Create JWT Token
      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      const response = NextResponse.json({ message: 'Login successful!', user: { name: user.name, email: user.email } }, { status: 200 });

      // Set token in a cookie
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
        path: '/',
      });
      
      return response;
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Auth API Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}