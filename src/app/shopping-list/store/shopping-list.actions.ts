import {Action} from '@ngrx/store'
import { Ingredient } from 'src/app/shared/ingredient.model'

export const ADD_INGREDIENT =  "ADD_INGREDIENT"
export const ADD_INGREDIENTS_FROM_RECIPES = "ADD_INGREDIENTS_FROM_RECIPES"
export const DELETE_INGREDIENT = "DELETE_INGREDIENT"
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT"


export const START_EDIT = "START_EDIT"
export const STOP_EDIT = "STOP_EDIT"


export class AddIngredient implements Action {
   readonly type = ADD_INGREDIENT
   constructor(public payload:Ingredient){}
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT
    constructor(public payload:{index:number,ingredient:Ingredient}){}
 }

export class StartEditing implements Action  {
    readonly type = START_EDIT
    constructor( public payload:number){}
} 
 
export class StopEditing implements Action  {
    readonly type = STOP_EDIT
} 

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT
    constructor(public payload:number){}
 }


 
 export class AddIngredientsFromRecipes implements Action {
    readonly type = ADD_INGREDIENTS_FROM_RECIPES
    constructor(public payload:Ingredient[]){}
 }

export type SHOPPING_LIST_ACTIONS  = AddIngredient 
                                    | StartEditing 
                                    | StopEditing
                                    | AddIngredientsFromRecipes 
                                    | UpdateIngredient 
                                    | DeleteIngredient