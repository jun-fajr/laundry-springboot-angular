import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LaundryItemDTO } from 'app/laundry-item/laundry-item.model';


@Injectable({
  providedIn: 'root',
})
export class LaundryItemService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/laundryItems';

  getAllLaundryItems() {
    return this.http.get<LaundryItemDTO[]>(this.resourcePath);
  }

  getLaundryItem(id: number) {
    return this.http.get<LaundryItemDTO>(this.resourcePath + '/' + id);
  }

  createLaundryItem(laundryItemDTO: LaundryItemDTO) {
    return this.http.post<number>(this.resourcePath, laundryItemDTO);
  }

  updateLaundryItem(id: number, laundryItemDTO: LaundryItemDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, laundryItemDTO);
  }

  deleteLaundryItem(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

}
