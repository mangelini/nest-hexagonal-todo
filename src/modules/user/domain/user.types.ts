// All properties that a User has
export interface UserProps {
  role: UserRoles;
  username: string;
}

// Properties that are needed for a user creation
export interface CreateUserProps {
  username: string;
}

export enum UserRoles {
  admin = 'admin',
  customer = 'customer',
}

export interface LoginUserPayload {
  id: string;
  username: string;
}

export interface LoginAccess {
  access_token: string;
  id: string;
}
