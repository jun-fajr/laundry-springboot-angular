import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { OrderItemService } from 'app/order-item/order-item.service';
import { OrderItemDTO } from 'app/order-item/order-item.model';


@Component({
  selector: 'app-order-item-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-item-list.component.html'})
export class OrderItemListComponent implements OnInit, OnDestroy {

  orderItemService = inject(OrderItemService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  orderItems?: OrderItemDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@orderItem.delete.success:Order Item was removed successfully.`    };
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
    this.orderItemService.getAllOrderItems()
        .subscribe({
          next: (data) => this.orderItems = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.orderItemService.deleteOrderItem(id)
          .subscribe({
            next: () => this.router.navigate(['/orderItems'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => this.errorHandler.handleServerError(error.error)
          });
    }
  }

}
