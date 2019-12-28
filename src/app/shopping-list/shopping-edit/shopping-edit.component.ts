import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";

import { Ingredient } from "src/app/shared/ingredient.model";
import { shoppingListService } from "src/app/shared/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") signForm: NgForm;

  private subscription: Subscription;
  private mode = false;
  private editedItemIndex: number;
  private editedItem: Ingredient;
  constructor(private shoppingListServ: shoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListServ.shoppingEdit.subscribe(
      (data: number) => {
        this.mode = true;
        this.editedItemIndex = data;
        this.editedItem = this.shoppingListServ.getIngredient(
          this.editedItemIndex
        );
        this.signForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          unit: this.editedItem.unit
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const ingredient = form.value;
    if (this.mode) {
      this.shoppingListServ.updateIngredient(
        this.editedItemIndex,
        new Ingredient(ingredient.name, ingredient.amount, ingredient.unit)
      );
    } else {
      this.shoppingListServ.addIngredient(
        new Ingredient(ingredient.name, ingredient.amount, ingredient.unit)
      );
    }
    this.onClear();
  }
  onDelete() {
    this.shoppingListServ.deleteIngredient(
      this.editedItemIndex,
    );
    this.onClear()
   
  }
  onClear() {
    this.mode = false;
    this.signForm.reset();
  }
}
