import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { shoppingListService } from '../shared/shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions'
import { AppState } from './store/shopping-list.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
 
})
export class ShoppingListComponent implements OnInit {
  ingredients:Observable<{ ingredients: Ingredient[]; }>;
  private igSubscription:Subscription
  constructor(
    private shoppingListServ: shoppingListService,
    private store:Store<AppState>,
    private router:Router) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this.shoppingListServ.getIngredients();
    // this.igSubscription = this.shoppingListServ.ingredientAdded.subscribe((data:Ingredient[])=>{
    //   if(data) {
    //     this.ingredients= data
    //   }
    // })
  }
 
  onEditShoppingList(i:number){
      // this.shoppingListServ.shoppingEdit.next(i)
      this.store.dispatch(new ShoppingListActions.StartEditing(i))
  } 
 
}
