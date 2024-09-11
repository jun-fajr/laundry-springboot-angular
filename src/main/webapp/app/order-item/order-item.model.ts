export class OrderItemDTO {

  constructor(data:Partial<OrderItemDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  quantity?: number|null;
  subtotal?: string|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  order?: number|null;
  laundryItem?: number|null;

}
