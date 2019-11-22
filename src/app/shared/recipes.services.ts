import { RecipesModel } from '../recipes/recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { shoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<RecipesModel>();
    constructor(private shoppingListService:shoppingListService){}
    private recipes :  RecipesModel[] =[
        new RecipesModel('Murgh Bhuna',
        'A simple recipe',
        'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/indian.jpg',
        [
            new Ingredient('Salt',20,'tbsp'),
            new Ingredient('Meat',3,'kg')
        ]),
        new RecipesModel('Murgh Mussallam',
        'A complex recipe',
        'https://asset.slimmingworld.co.uk/content/media/11596/jackfruit-chilli-iceland_sw_recipe.jpg?v1=JGXiore20qg9NNIj0tmc3TKfKw-jr0s127JqqpCA2x7sMviNgcAYh1epuS_Lqxebn9V_qusKHfwbF7MOUrAPptzBhXIUL1Xnq2Mmdvx4fOk&width=320&height=320',
        [
            new Ingredient('Salt',10,'tbsp'),
            new Ingredient('Meat',1,'kg')

        ])
    ]
    getRecipes() {
        return this.recipes.slice()
    }
    addIngredientsToShoppingList(ingredient:Ingredient[]){

        this.shoppingListService.addIngredientsFromRecipes(ingredient)
    }
    
}