import { RecipesModel } from '../recipes.model';
import * as RecipesActions from '../store/recipes.actions'


export interface RecipesState {
    recipes:RecipesModel[]
}
export const initialState:RecipesState = {
    recipes : []
}
export function RecipesReducer(state: RecipesState = initialState ,action: RecipesActions.RecipesActions) {
    switch(action.type) {
        case RecipesActions.SET_RECIPES : 
        if(state.recipes.length > 0)  {
            state.recipes = []
        }
        return {
            ...state,
            recipes:[...state.recipes,...action.payload]
            
        }
        default: {
            return state
        }

    }
    
}  