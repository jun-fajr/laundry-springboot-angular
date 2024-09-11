import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { LaundryItemService } from 'app/laundry-item/laundry-item.service';
import { LaundryItemDTO } from 'app/laundry-item/laundry-item.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validNumeric, validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-laundry-item-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './laundry-item-add.component.html'
})
export class LaundryItemAddComponent {

  laundryItemService = inject(LaundryItemService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    description: new FormControl(null, [Validators.maxLength(255)]),
    price: new FormControl(null, [Validators.required, validNumeric(12, 2)]),
    createdAt: new FormControl(null, [validOffsetDateTime]),
    updatedAt: new FormControl(null, [validOffsetDateTime])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@laundryItem.create.success:Laundry Item was created successfully.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new LaundryItemDTO(this.addForm.value);
    this.laundryItemService.createLaundryItem(data)
        .subscribe({
          next: () => this.router.navigate(['/laundryItems'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
