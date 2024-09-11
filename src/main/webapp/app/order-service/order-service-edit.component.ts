import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { OrderServiceService } from 'app/order-service/order-service.service';
import { OrderServiceDTO } from 'app/order-service/order-service.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validNumeric, validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-order-service-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './order-service-edit.component.html'
})
export class OrderServiceEditComponent implements OnInit {

  orderServiceService = inject(OrderServiceService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  orderValues?: Map<number,string>;
  serviceValues?: Map<number,string>;
  currentId?: number;

  editForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    quantity: new FormControl(null, [Validators.required]),
    subtotal: new FormControl(null, [Validators.required, validNumeric(12, 2)]),
    createdAt: new FormControl(null, [validOffsetDateTime]),
    updatedAt: new FormControl(null, [validOffsetDateTime]),
    order: new FormControl(null, [Validators.required]),
    service: new FormControl(null, [Validators.required])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@orderService.update.success:Order Service was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentId = +this.route.snapshot.params['id'];
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
    this.orderServiceService.getOrderService(this.currentId!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new OrderServiceDTO(this.editForm.value);
    this.orderServiceService.updateOrderService(this.currentId!, data)
        .subscribe({
          next: () => this.router.navigate(['/orderServices'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
