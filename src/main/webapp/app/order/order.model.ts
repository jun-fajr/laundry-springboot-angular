export class OrderDTO {

  constructor(data:Partial<OrderDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  totalAmount?: string|null;
  status?: string|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  customer?: number|null;

}
