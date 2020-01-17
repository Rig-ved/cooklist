import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'
import * as fromAuth from '../auth/auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store'


export interface AppState {
    authList:fromAuth.UserState,
    shoppingList:fromShoppingList.State
}


export const AppReducer : ActionReducerMap<AppState> =  {
    authList:fromAuth.AuthReducer,
    shoppingList:fromShoppingList.shoppingListReducer

}