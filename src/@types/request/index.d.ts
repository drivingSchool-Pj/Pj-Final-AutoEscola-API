import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      validatedBody: object;
      userDecode: {
        isAdm: boolean;
        id: string;
      };
    }
  }
}

export {};
