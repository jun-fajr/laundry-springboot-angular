import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CustomerDTO } from 'app/customer/customer.model';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/customers';

  getAllCustomers() {
    return this.http.get<CustomerDTO[]>(this.resourcePath);
  }

  getCustomer(id: number) {
    return this.http.get<CustomerDTO>(this.resourcePath + '/' + id);
  }

  createCustomer(customerDTO: CustomerDTO) {
    return this.http.post<number>(this.resourcePath, customerDTO);
  }

  updateCustomer(id: number, customerDTO: CustomerDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, customerDTO);
  }

  deleteCustomer(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

}
