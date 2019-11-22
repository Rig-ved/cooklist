import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { shoppingListService } from '../shared/shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
 
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] ;
  constructor(private shoppingListServ: shoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListServ.getIngredients();
    this.shoppingListServ.ingredientAdded.subscribe((data:Ingredient[])=>{
      if(data) {
        this.ingredients= data
      }
    })
  }
 
}
