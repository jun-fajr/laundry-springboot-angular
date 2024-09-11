export class PaymentDTO {

  constructor(data:Partial<PaymentDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  amount?: string|null;
  method?: string|null;
  status?: string|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  order?: number|null;

}
