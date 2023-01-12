import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      validatedBody: object;
      user: {
        id: string;
        isAdm: boolean;
      };
    }
  }
}

export {};
