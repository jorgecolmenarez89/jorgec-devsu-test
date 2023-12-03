import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes } from '@angular/router';
import { ProductsRoutingModule } from './products-router-module';
import { ProductsComponent } from './products.component';
import { ProductsSaveComponent } from './components/products-save.component';
import { AvatarComponent } from '../components/avatar/avatar.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ModalComponent } from '../components/modal/modal.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
];

@NgModule({
  entryComponents: [
    ModalComponent
  ],
  declarations: [
    ProductsComponent,
    ProductsSaveComponent,
    AvatarComponent,
    PaginationComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
