import { Ingredient } from './ingredient.model';
import { EventEmitter } from '@angular/core';

export class shoppingListService {
    
    ingredientAdded = new EventEmitter<Ingredient[]>()

    private ingredients:Ingredient[] = [
        new Ingredient('Sugar',10,'tbsp'),
        new Ingredient('Salt',2,'tbsp'),
    ]

    getIngredients() {
        return this.ingredients.slice();
    }
    addIngredient(ingredient:Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientAdded.emit(this.ingredients.slice())
    }
    addIngredientsFromRecipes(ingredients:Ingredient[]) {
         this.ingredients.push(...ingredients);
         this.ingredientAdded.emit(this.ingredients.slice())   
    }
}