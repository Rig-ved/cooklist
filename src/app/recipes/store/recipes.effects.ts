import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as RecipesActions from './recipes.actions';

import { RecipesModel } from '../recipes.model';
import { EnvService } from 'src/app/env.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.GET_RECIPE_DETAIL),
    switchMap(() => {
        let url = this.envService.post +'recipes.json';
        return this.http
            .get<RecipesModel[]>(url)
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipesAction(recipes);
    })
  );

  @Effect()
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(
      this.store.select('recipesList')
    ),
    switchMap( ([actionData,recipesState]) => {
      let url = this.envService.post +'recipes.json'
      return this.http.put(url,recipesState.recipes)
    }),
    
  );

  constructor(private actions$: Actions,
    private envService:EnvService,
    private store:Store<AppState>,
    private http: HttpClient) {}
}
