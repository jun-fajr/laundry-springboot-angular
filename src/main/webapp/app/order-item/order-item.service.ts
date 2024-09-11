import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { OrderItemDTO } from 'app/order-item/order-item.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class OrderItemService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/orderItems';

  getAllOrderItems() {
    return this.http.get<OrderItemDTO[]>(this.resourcePath);
  }

  getOrderItem(id: number) {
    return this.http.get<OrderItemDTO>(this.resourcePath + '/' + id);
  }

  createOrderItem(orderItemDTO: OrderItemDTO) {
    return this.http.post<number>(this.resourcePath, orderItemDTO);
  }

  updateOrderItem(id: number, orderItemDTO: OrderItemDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, orderItemDTO);
  }

  deleteOrderItem(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

  getOrderValues() {
    return this.http.get<Record<string,string>>(this.resourcePath + '/orderValues')
        .pipe(map(transformRecordToMap));
  }

  getLaundryItemValues() {
    return this.http.get<Record<string,string>>(this.resourcePath + '/laundryItemValues')
        .pipe(map(transformRecordToMap));
  }

}
