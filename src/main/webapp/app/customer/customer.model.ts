export class CustomerDTO {

  constructor(data:Partial<CustomerDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  name?: string|null;
  email?: string|null;
  phone?: string|null;
  address?: string|null;
  createdAt?: string|null;
  updatedAt?: string|null;

}
