import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ServiceDTO } from 'app/service/service.model';


@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/services';

  getAllServices() {
    return this.http.get<ServiceDTO[]>(this.resourcePath);
  }

  getService(id: number) {
    return this.http.get<ServiceDTO>(this.resourcePath + '/' + id);
  }

  createService(serviceDTO: ServiceDTO) {
    return this.http.post<number>(this.resourcePath, serviceDTO);
  }

  updateService(id: number, serviceDTO: ServiceDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, serviceDTO);
  }

  deleteService(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

}
