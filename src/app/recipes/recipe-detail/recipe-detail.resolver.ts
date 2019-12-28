// import { Injectable } from '@angular/core';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { RecipesModel } from '../recipes.model';
// import { RecipeService } from 'src/app/shared/recipes.services';

// @Injectable({providedIn:'root'})
// export class RecipeDetailResolver implements Resolve<RecipesModel> {
//     constructor(private recipeService:RecipeService){}
//     resolve(route:ActivatedRouteSnapshot,
//         currentState:RouterStateSnapshot,
//     ) {
//         const id = Number(route.params['id'])
//         return this.recipeService.getRecipe(id);
//     }

// }

import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-store.service';
import { RecipeService } from 'src/app/shared/recipes.services';
import { RecipesModel } from '../recipes.model';


@Injectable({ providedIn: 'root' })
export class RecipeDetailResolver implements Resolve<RecipesModel[]> {
  constructor(
    private dataStorageService: DataStorageService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.dataStorageService.fetchRecipes()
    
  }
}
