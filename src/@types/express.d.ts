declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface Request {
    user?: {
      id: string;
      name: string;
      email: string;
      password: string;
      phone: string;
      status: string;
      address: string;
      number: string;
      avatar: string;
      created_at: Date;
      updated_at: Date;
    };
  }
}
