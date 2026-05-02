import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export class AuthService {
  async login(username: string, pass: string) {
    // Hardcoded for example, in production verify from DB
    if (username === 'admin' && pass === 'password') {
      const token = jwt.sign({ sub: 1, username, roles: ['admin'] }, JWT_SECRET, { expiresIn: '1h' });
      return { access_token: token };
    }
    return null;
  }
}
