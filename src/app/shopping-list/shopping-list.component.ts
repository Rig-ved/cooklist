import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { shoppingListService } from '../shared/shopping-list.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
 
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Ingredient[] ;
  private igSubscription:Subscription
  constructor(
    private shoppingListServ: shoppingListService,private router:Router) { }

  ngOnInit() {
    this.ingredients = this.shoppingListServ.getIngredients();
    this.igSubscription = this.shoppingListServ.ingredientAdded.subscribe((data:Ingredient[])=>{
      if(data) {
        this.ingredients= data
      }
    })
  }
  ngOnDestroy(){
    this.igSubscription.unsubscribe()
  }
  onEditShoppingList(i:number){
      this.shoppingListServ.shoppingEdit.next(i)
  } 
 
}
