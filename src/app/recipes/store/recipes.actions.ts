import { Action } from '@ngrx/store';
import { RecipesModel } from '../recipes.model';

export const SET_RECIPES = "[Recipes] set_recipes"

export class SetRecipesAction implements Action {
    readonly type = SET_RECIPES
    constructor(public payload:RecipesModel[]){}
}


export type RecipesActions = SetRecipesAction