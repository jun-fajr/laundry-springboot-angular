import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { OrderServiceDTO } from 'app/order-service/order-service.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/orderServices';

  getAllOrderServices() {
    return this.http.get<OrderServiceDTO[]>(this.resourcePath);
  }

  getOrderService(id: number) {
    return this.http.get<OrderServiceDTO>(this.resourcePath + '/' + id);
  }

  createOrderService(orderServiceDTO: OrderServiceDTO) {
    return this.http.post<number>(this.resourcePath, orderServiceDTO);
  }

  updateOrderService(id: number, orderServiceDTO: OrderServiceDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, orderServiceDTO);
  }

  deleteOrderService(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

  getOrderValues() {
    return this.http.get<Record<string,string>>(this.resourcePath + '/orderValues')
        .pipe(map(transformRecordToMap));
  }

  getServiceValues() {
    return this.http.get<Record<string,string>>(this.resourcePath + '/serviceValues')
        .pipe(map(transformRecordToMap));
  }

}
