import { Action } from '@ngrx/store';
import { RecipesModel } from '../recipes.model';

export const SET_RECIPES = "[Recipes] set_recipes"
export const GET_RECIPE_DETAIL ="[Recipes] get recipes detail"
export const ADD_RECIPE ="[Recipes] add Recipes"
export const UPDATE_RECIPE ="[Recipes] update recipes"
export const DELETE_RECIPE ="[Recipes] delete recipes"
export const STORE_RECIPES ="[Recipes] store recipes onto server"


export class SetRecipesAction implements Action {
    readonly type = SET_RECIPES
    constructor(public payload:RecipesModel[]){}
}
export class GetRecipeForDetailAction implements Action {
    readonly type  = GET_RECIPE_DETAIL
}
export class addRecipeAction implements Action {
    readonly type  = ADD_RECIPE
    constructor(public payload:RecipesModel){}
}
export class updateRecipeAction implements Action {
    readonly type  = UPDATE_RECIPE
    constructor(public payload:{
        index:number,
        newRecipe:RecipesModel
    }){}
}

export class deleteRecipeAction implements Action {
    readonly type  = DELETE_RECIPE
    constructor(public payload:number){}
}
 
export class storeRecipesAction implements Action {
    readonly type  = STORE_RECIPES
    constructor( ){}
}

export type RecipesActions = SetRecipesAction |storeRecipesAction| GetRecipeForDetailAction | addRecipeAction | updateRecipeAction | deleteRecipeAction