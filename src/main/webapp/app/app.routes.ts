import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { CustomerAddComponent } from './customer/customer-add.component';
import { CustomerEditComponent } from './customer/customer-edit.component';
import { LaundryItemListComponent } from './laundry-item/laundry-item-list.component';
import { LaundryItemAddComponent } from './laundry-item/laundry-item-add.component';
import { LaundryItemEditComponent } from './laundry-item/laundry-item-edit.component';
import { OrderListComponent } from './order/order-list.component';
import { OrderAddComponent } from './order/order-add.component';
import { OrderEditComponent } from './order/order-edit.component';
import { OrderItemListComponent } from './order-item/order-item-list.component';
import { OrderItemAddComponent } from './order-item/order-item-add.component';
import { OrderItemEditComponent } from './order-item/order-item-edit.component';
import { OrderServiceListComponent } from './order-service/order-service-list.component';
import { OrderServiceAddComponent } from './order-service/order-service-add.component';
import { OrderServiceEditComponent } from './order-service/order-service-edit.component';
import { ServiceListComponent } from './service/service-list.component';
import { ServiceAddComponent } from './service/service-add.component';
import { ServiceEditComponent } from './service/service-edit.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeAddComponent } from './employee/employee-add.component';
import { EmployeeEditComponent } from './employee/employee-edit.component';
import { PaymentListComponent } from './payment/payment-list.component';
import { PaymentAddComponent } from './payment/payment-add.component';
import { PaymentEditComponent } from './payment/payment-edit.component';
import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: $localize`:@@home.index.headline:Welcome to your new app!`
  },
  {
    path: 'customers',
    component: CustomerListComponent,
    title: $localize`:@@customer.list.headline:Customers`
  },
  {
    path: 'customers/add',
    component: CustomerAddComponent,
    title: $localize`:@@customer.add.headline:Add Customer`
  },
  {
    path: 'customers/edit/:id',
    component: CustomerEditComponent,
    title: $localize`:@@customer.edit.headline:Edit Customer`
  },
  {
    path: 'laundryItems',
    component: LaundryItemListComponent,
    title: $localize`:@@laundryItem.list.headline:Laundry Items`
  },
  {
    path: 'laundryItems/add',
    component: LaundryItemAddComponent,
    title: $localize`:@@laundryItem.add.headline:Add Laundry Item`
  },
  {
    path: 'laundryItems/edit/:id',
    component: LaundryItemEditComponent,
    title: $localize`:@@laundryItem.edit.headline:Edit Laundry Item`
  },
  {
    path: 'orders',
    component: OrderListComponent,
    title: $localize`:@@order.list.headline:Orders`
  },
  {
    path: 'orders/add',
    component: OrderAddComponent,
    title: $localize`:@@order.add.headline:Add Order`
  },
  {
    path: 'orders/edit/:id',
    component: OrderEditComponent,
    title: $localize`:@@order.edit.headline:Edit Order`
  },
  {
    path: 'orderItems',
    component: OrderItemListComponent,
    title: $localize`:@@orderItem.list.headline:Order Items`
  },
  {
    path: 'orderItems/add',
    component: OrderItemAddComponent,
    title: $localize`:@@orderItem.add.headline:Add Order Item`
  },
  {
    path: 'orderItems/edit/:id',
    component: OrderItemEditComponent,
    title: $localize`:@@orderItem.edit.headline:Edit Order Item`
  },
  {
    path: 'orderServices',
    component: OrderServiceListComponent,
    title: $localize`:@@orderService.list.headline:Order Services`
  },
  {
    path: 'orderServices/add',
    component: OrderServiceAddComponent,
    title: $localize`:@@orderService.add.headline:Add Order Service`
  },
  {
    path: 'orderServices/edit/:id',
    component: OrderServiceEditComponent,
    title: $localize`:@@orderService.edit.headline:Edit Order Service`
  },
  {
    path: 'services',
    component: ServiceListComponent,
    title: $localize`:@@service.list.headline:Services`
  },
  {
    path: 'services/add',
    component: ServiceAddComponent,
    title: $localize`:@@service.add.headline:Add Service`
  },
  {
    path: 'services/edit/:id',
    component: ServiceEditComponent,
    title: $localize`:@@service.edit.headline:Edit Service`
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    title: $localize`:@@employee.list.headline:Employees`
  },
  {
    path: 'employees/add',
    component: EmployeeAddComponent,
    title: $localize`:@@employee.add.headline:Add Employee`
  },
  {
    path: 'employees/edit/:id',
    component: EmployeeEditComponent,
    title: $localize`:@@employee.edit.headline:Edit Employee`
  },
  {
    path: 'payments',
    component: PaymentListComponent,
    title: $localize`:@@payment.list.headline:Payments`
  },
  {
    path: 'payments/add',
    component: PaymentAddComponent,
    title: $localize`:@@payment.add.headline:Add Payment`
  },
  {
    path: 'payments/edit/:id',
    component: PaymentEditComponent,
    title: $localize`:@@payment.edit.headline:Edit Payment`
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: $localize`:@@error.headline:Error`
  },
  {
    path: '**',
    component: ErrorComponent,
    title: $localize`:@@notFound.headline:Page not found`
  }
];
