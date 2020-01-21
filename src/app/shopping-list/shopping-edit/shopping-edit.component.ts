import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from "@angular/core";

import { Ingredient } from "src/app/shared/ingredient.model";
import { shoppingListService } from "src/app/shared/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../store/shopping-list.actions'
import { AppState } from '../../app.reducer';
import { State} from '../store/shopping-list.reducer'

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") signForm: NgForm;

  private subscription: Subscription;
  public mode = false;
  public editedItemIndex: number;
  public editedItem: Ingredient;
  constructor(
    private shoppingListServ: shoppingListService,
    private store:Store<AppState>,  
  ) {}

  ngOnInit() {

    this.subscription = this.store.select('shoppingList').subscribe((stateData:State)=>{
      if(stateData.editedIngredientIndex > -1) {
          this.mode= true
          this.editedItemIndex = stateData.editedIngredientIndex;
          this.editedItem = stateData.editedIngredient; 
          this.signForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            unit: this.editedItem.unit
          });
      } else {
        this.mode=false
      }
    })

    // this.subscription = this.shoppingListServ.shoppingEdit.subscribe(
    //   (data: number) => {
    //     this.mode = true;
    //     this.editedItemIndex = data;
    //     this.editedItem = this.shoppingListServ.getIngredient(
    //       this.editedItemIndex
    //     );
       
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.store.dispatch(new shoppingListActions.StopEditing())
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const ingredient = form.value;
    const newIngredient = new Ingredient(ingredient.name, ingredient.amount, ingredient.unit)
    if (this.mode) {
      // this.shoppingListServ.updateIngredient(
      //   this.editedItemIndex,
      //   newIngredient
      // );
        this.store.dispatch(new shoppingListActions.UpdateIngredient({
          index:this.editedItemIndex,
          ingredient:newIngredient
        }))
    } else {
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient))
      // this.shoppingListServ.addIngredient(
      //   new Ingredient(ingredient.name, ingredient.amount, ingredient.unit)
      // );
    }
    this.onClear();
  }
  onDelete() {
    // this.shoppingListServ.deleteIngredient(
    //   this.editedItemIndex,
    // );

   // this.store.dispatch(new shoppingListActions.DeleteIngredient(this.editedItemIndex))
    this.store.dispatch(new shoppingListActions.DeleteIngredient(this.editedItemIndex))
    
   this.onClear()
   
  }
  onClear() {
    this.store.dispatch(new shoppingListActions.StopEditing())
    this.mode = false;
    this.signForm.reset();
    
    //
  }
}
