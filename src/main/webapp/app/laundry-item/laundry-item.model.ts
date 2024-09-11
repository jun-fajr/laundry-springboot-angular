export class LaundryItemDTO {

  constructor(data:Partial<LaundryItemDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  name?: string|null;
  description?: string|null;
  price?: string|null;
  createdAt?: string|null;
  updatedAt?: string|null;

}
