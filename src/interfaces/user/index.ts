export interface IUserRequestAddress {
  id: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
}

export interface IUserRequest {
  id: string;
  name: string;
  email: string;
  contact: string;
  age: number;
  cpf: string;
  isAdm: boolean;
  isActive: boolean;
  typeCategorie: string;
  address: IUserRequestAddress;
  createdAt: Date;
  updatedAt: Date;
}
