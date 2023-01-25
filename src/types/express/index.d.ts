export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        name: string;
        email: string;
        lastLogin: Date;
        phoneNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    }
  }
}
