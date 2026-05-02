import { Request, Response } from 'express';
import { AuthService } from '@app/auth/auth.service';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    
    if (!result) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    return res.json(result);
  }
}

