import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipesModel } from '../recipes.model';
import { RecipeService } from 'src/app/shared/recipes.services';

@Injectable({providedIn:'root'})
export class RecipeDetailResolver implements Resolve<RecipesModel> {
    constructor(private recipeService:RecipeService){}
    resolve(route:ActivatedRouteSnapshot,
        currentState:RouterStateSnapshot,
    ) {
        const id = Number(route.params['id']) - 1
        return this.recipeService.getRecipe(id);
    }

}