export interface IUserRequest {
  name: string;
  email: string;
  contact: string;
  age: number;
  cpf: string;
  isAdm: boolean;
  isActive?: boolean;
  typeCategorie?: string;
  address: IAddressRequest;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAddressRequest {
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDecode {
  id?: string;
  sub?: string;
  name?: string;
  isAdm?: boolean;
  isActive?: boolean;
}

export interface IUserBody {
  id?: string;
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}
