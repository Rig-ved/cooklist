import * as fromShoppingList from '../app/shopping-list/store/shopping-list.reducer'
import * as fromAuth from './auth/auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store'
import * as fromRecipes from './recipes/store/recipes.reducer'

export interface AppState {
    authList:fromAuth.UserState,
    recipesList:fromRecipes.RecipesState,
    shoppingList:fromShoppingList.ShoppingListState
}


export const AppReducer : ActionReducerMap<AppState> =  {
    authList:fromAuth.AuthReducer,
    recipesList:fromRecipes.RecipesReducer,
    shoppingList:fromShoppingList.shoppingListReducer

}