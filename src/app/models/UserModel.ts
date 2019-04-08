export class UserModel {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  department: string;
  departmentName: string;
  roles: Array<string>;
}

export class EmbendedUserBodyList {
  _embedded: {
    userBodyList: Array<UserModel>;
  };
}
