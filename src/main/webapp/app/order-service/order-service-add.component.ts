import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { OrderServiceService } from 'app/order-service/order-service.service';
import { OrderServiceDTO } from 'app/order-service/order-service.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validNumeric, validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-order-service-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './order-service-add.component.html'
})
export class OrderServiceAddComponent implements OnInit {

  orderServiceService = inject(OrderServiceService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  orderValues?: Map<number,string>;
  serviceValues?: Map<number,string>;

  addForm = new FormGroup({
    quantity: new FormControl(null, [Validators.required]),
    subtotal: new FormControl(null, [Validators.required, validNumeric(12, 2)]),
    createdAt: new FormControl(null, [validOffsetDateTime]),
    updatedAt: new FormControl(null, [validOffsetDateTime]),
    order: new FormControl(null, [Validators.required]),
    service: new FormControl(null, [Validators.required])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@orderService.create.success:Order Service was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.orderServiceService.getOrderValues()
        .subscribe({
          next: (data) => this.orderValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.orderServiceService.getServiceValues()
        .subscribe({
          next: (data) => this.serviceValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new OrderServiceDTO(this.addForm.value);
    this.orderServiceService.createOrderService(data)
        .subscribe({
          next: () => this.router.navigate(['/orderServices'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
