import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { PaymentService } from 'app/payment/payment.service';
import { PaymentDTO } from 'app/payment/payment.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validNumeric, validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-payment-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './payment-edit.component.html'
})
export class PaymentEditComponent implements OnInit {

  paymentService = inject(PaymentService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  orderValues?: Map<number,string>;
  currentId?: number;

  editForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    amount: new FormControl(null, [Validators.required, validNumeric(12, 2)]),
    method: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    status: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    createdAt: new FormControl(null, [validOffsetDateTime]),
    updatedAt: new FormControl(null, [validOffsetDateTime]),
    order: new FormControl(null, [Validators.required])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@payment.update.success:Payment was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentId = +this.route.snapshot.params['id'];
    this.paymentService.getOrderValues()
        .subscribe({
          next: (data) => this.orderValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.paymentService.getPayment(this.currentId!)
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
    const data = new PaymentDTO(this.editForm.value);
    this.paymentService.updatePayment(this.currentId!, data)
        .subscribe({
          next: () => this.router.navigate(['/payments'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
