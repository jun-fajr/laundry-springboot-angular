export class EmployeeDTO {

  constructor(data:Partial<EmployeeDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  name?: string|null;
  email?: string|null;
  phone?: string|null;
  role?: string|null;
  createdAt?: string|null;
  updatedAt?: string|null;

}
