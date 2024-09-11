import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { EmployeeDTO } from 'app/employee/employee.model';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/employees';

  getAllEmployees() {
    return this.http.get<EmployeeDTO[]>(this.resourcePath);
  }

  getEmployee(id: number) {
    return this.http.get<EmployeeDTO>(this.resourcePath + '/' + id);
  }

  createEmployee(employeeDTO: EmployeeDTO) {
    return this.http.post<number>(this.resourcePath, employeeDTO);
  }

  updateEmployee(id: number, employeeDTO: EmployeeDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, employeeDTO);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

}
