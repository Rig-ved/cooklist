import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import * as RecipesActions from './recipes.actions';

import { RecipesModel } from '../recipes.model';
import { EnvService } from 'src/app/env.service';

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

  constructor(private actions$: Actions,
    private envService:EnvService,
    private http: HttpClient) {}
}
