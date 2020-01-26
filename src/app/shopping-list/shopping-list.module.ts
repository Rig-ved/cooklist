import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from '../auth/auth/auth.guard';

const slRoutes: Routes = [
  {
    path: "", 
    //canActivate:[AuthGuard],
    component: ShoppingListComponent
  }
];
@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  exports: [ShoppingListComponent, ShoppingEditComponent, RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(slRoutes),
  ]
})
export class shoppingListModule {}
