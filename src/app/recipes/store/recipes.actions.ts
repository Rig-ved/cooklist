import { Action } from '@ngrx/store';
import { RecipesModel } from '../recipes.model';

export const SET_RECIPES = "[Recipes] set_recipes"
export const GET_RECIPE_DETAIL ="[Recipes] get recipes detail"

export class SetRecipesAction implements Action {
    readonly type = SET_RECIPES
    constructor(public payload:RecipesModel[]){}
}
export class GetRecipeForDetailAction implements Action {
    readonly type  = GET_RECIPE_DETAIL
    constructor(){}
}


export type RecipesActions = SetRecipesAction | GetRecipeForDetailAction