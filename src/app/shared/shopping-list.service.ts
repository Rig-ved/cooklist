import { Ingredient } from './ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class shoppingListService {
    
    ingredientAdded = new Subject<Ingredient[]>()
    shoppingEdit = new Subject<number>()


    private ingredients:Ingredient[] = [
        new Ingredient('Sugar',10,'tbsp'),
        new Ingredient('Salt',2,'tbsp'),
    ]

    getIngredients() {
        return this.ingredients.slice();
    }
    getIngredient(id:number):Ingredient {
        return this.ingredients[id]
    }
    updateIngredient(index:number,newIngredient:Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientAdded.next(this.ingredients.slice())
    }
    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientAdded.next(this.ingredients.slice())
    }
    addIngredient(ingredient:Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientAdded.next(this.ingredients.slice())
    }
    addIngredientsFromRecipes(ingredients:Ingredient[]) {
         this.ingredients.push(...ingredients);
         this.ingredientAdded.next(this.ingredients.slice())   
    }
}