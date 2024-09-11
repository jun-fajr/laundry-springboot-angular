import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { OrderServiceService } from 'app/order-service/order-service.service';
import { OrderServiceDTO } from 'app/order-service/order-service.model';


@Component({
  selector: 'app-order-service-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-service-list.component.html'})
export class OrderServiceListComponent implements OnInit, OnDestroy {

  orderServiceService = inject(OrderServiceService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  orderServices?: OrderServiceDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@orderService.delete.success:Order Service was removed successfully.`    };
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
    this.orderServiceService.getAllOrderServices()
        .subscribe({
          next: (data) => this.orderServices = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.orderServiceService.deleteOrderService(id)
          .subscribe({
            next: () => this.router.navigate(['/orderServices'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => this.errorHandler.handleServerError(error.error)
          });
    }
  }

}
