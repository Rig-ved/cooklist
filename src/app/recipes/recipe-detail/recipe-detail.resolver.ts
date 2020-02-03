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

import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { DataStorageService } from "src/app/shared/data-store.service";
import { RecipesModel } from "../recipes.model";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import { RecipesState } from "../store/recipes.reducer";
import { map, tap, take } from "rxjs/operators";
import { Observable } from 'rxjs';
import * as RecipeActions from '../store/recipes.actions'
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: "root" })
export class RecipeDetailResolver implements Resolve<RecipesModel[]> {
  constructor(private store: Store<AppState>,private actions$:Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // return this.dataStorageService.fetchRecipes()
      this.store.dispatch(new RecipeActions.GetRecipeForDetailAction());
      return this.actions$.pipe(
        ofType(RecipeActions.SET_RECIPES),
        take(1)
      )

  }
}

// Resolver espects an Observable as a return value on the resolve method here on the resolver
// and it waits for the obs to complete before it loads the route for which u added the resolver
// the problem is when we dispatch an action we dont get back  an  observable , therefore resolve would
// instantly resolve and we would load the route instantly where the data isnt there yet 

