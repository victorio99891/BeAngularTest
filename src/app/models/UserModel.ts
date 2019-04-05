export class UserModel {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  department: string;
  roles: Array<string>;
}
