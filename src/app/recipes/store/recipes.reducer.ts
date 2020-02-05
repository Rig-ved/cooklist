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
        case RecipesActions.ADD_RECIPE : 
        return {
            ...state,
            recipes:[...state.recipes,action.payload]
        }

        case RecipesActions.UPDATE_RECIPE : 
        const updatedRecipe = {
            ...state.recipes[action.payload.index],
            ...action.payload.newRecipe
        }

        const updatedRecipes = [...state.recipes];
        updatedRecipes[action.payload.index] = updatedRecipe

        return {
            ...state,
            recipes:updatedRecipes
        }

        case RecipesActions.DELETE_RECIPE:
        return  {
            ...state,
            recipes:state.recipes.filter((item,index) => {
                return index !== action.payload
            })
        }    
        default: {
            return state
        }

    }
    
}  