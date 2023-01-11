import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      validatedBody: object;
      userDecode: {
        id?: string;
        sub?: string;
        name: string;
      };
    }
  }
}

export {};
