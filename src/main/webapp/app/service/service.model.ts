export class ServiceDTO {

  constructor(data:Partial<ServiceDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  name?: string|null;
  description?: string|null;
  price?: string|null;
  createdAt?: string|null;
  updatedAt?: string|null;

}
