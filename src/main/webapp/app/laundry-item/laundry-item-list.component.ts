import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { LaundryItemService } from 'app/laundry-item/laundry-item.service';
import { LaundryItemDTO } from 'app/laundry-item/laundry-item.model';


@Component({
  selector: 'app-laundry-item-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './laundry-item-list.component.html'})
export class LaundryItemListComponent implements OnInit, OnDestroy {

  laundryItemService = inject(LaundryItemService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  laundryItems?: LaundryItemDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@laundryItem.delete.success:Laundry Item was removed successfully.`,
      'laundryItem.orderItem.laundryItem.referenced': $localize`:@@laundryItem.orderItem.laundryItem.referenced:This entity is still referenced by Order Item ${details?.id} via field Laundry Item.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }
  
  loadData() {
    this.laundryItemService.getAllLaundryItems()
        .subscribe({
          next: (data) => this.laundryItems = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.laundryItemService.deleteLaundryItem(id)
          .subscribe({
            next: () => this.router.navigate(['/laundryItems'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => {
              if (error.error?.code === 'REFERENCED') {
                const messageParts = error.error.message.split(',');
                this.router.navigate(['/laundryItems'], {
                  state: {
                    msgError: this.getMessage(messageParts[0], { id: messageParts[1] })
                  }
                });
                return;
              }
              this.errorHandler.handleServerError(error.error)
            }
          });
    }
  }

}
