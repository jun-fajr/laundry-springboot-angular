export class OrderServiceDTO {

  constructor(data:Partial<OrderServiceDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  quantity?: number|null;
  subtotal?: string|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  order?: number|null;
  service?: number|null;

}
