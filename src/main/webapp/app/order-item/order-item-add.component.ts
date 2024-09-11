import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { OrderItemService } from 'app/order-item/order-item.service';
import { OrderItemDTO } from 'app/order-item/order-item.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validNumeric, validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-order-item-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './order-item-add.component.html'
})
export class OrderItemAddComponent implements OnInit {

  orderItemService = inject(OrderItemService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  orderValues?: Map<number,string>;
  laundryItemValues?: Map<number,string>;

  addForm = new FormGroup({
    quantity: new FormControl(null, [Validators.required]),
    subtotal: new FormControl(null, [Validators.required, validNumeric(12, 2)]),
    createdAt: new FormControl(null, [validOffsetDateTime]),
    updatedAt: new FormControl(null, [validOffsetDateTime]),
    order: new FormControl(null, [Validators.required]),
    laundryItem: new FormControl(null, [Validators.required])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@orderItem.create.success:Order Item was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.orderItemService.getOrderValues()
        .subscribe({
          next: (data) => this.orderValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.orderItemService.getLaundryItemValues()
        .subscribe({
          next: (data) => this.laundryItemValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new OrderItemDTO(this.addForm.value);
    this.orderItemService.createOrderItem(data)
        .subscribe({
          next: () => this.router.navigate(['/orderItems'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
