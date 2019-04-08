export class DepartmentModel {
  departmentId: string;
  name: string;
}

export class EmbbendedDepartmentBodyList {
  _embedded: {
    departmentBodyList: Array<DepartmentModel>;
  };
}
