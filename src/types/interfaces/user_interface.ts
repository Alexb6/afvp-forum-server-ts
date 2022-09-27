import { User } from '../../modules/User/Entity';

export interface userDTOInterface {
  id?: number;
  gender: string;
  firstname: string;
  lastname: string;
  email: string;
  email_verified?: boolean;
  photo_url?: string;
  address_line01?: string;
  address_line02?: string;
  address_line03?: string;
  firm?: string;
  created_date?: Date;
  updated_date?: Date;
}

export interface userInterface {
  password: string;
  password_confirm: string;
}

export interface userRepositoryInterface {
  createUser(userData: User): Promise<User>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

export interface userServiceInterface {
  signUpUser(userData: User): Promise<User>;
}
