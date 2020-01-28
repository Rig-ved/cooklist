import { Ingredient } from "../../shared/ingredient.model";
import * as shoppingList from "./shopping-list.actions";


export interface ShoppingListState  {
    ingredients:Ingredient[],
    editedIngredient:Ingredient,
    editedIngredientIndex:number
}
const initialState : ShoppingListState= {
    ingredients: [
        new Ingredient("Sugar", 10, "tbsp"),
        new Ingredient("Salt", 2, "tbsp")
    ],
    editedIngredient:null,
    editedIngredientIndex:-1
};

export function shoppingListReducer(
    state:ShoppingListState = initialState,
    action: shoppingList.SHOPPING_LIST_ACTIONS
) : ShoppingListState {
        switch (action.type) {
            case shoppingList.ADD_INGREDIENT:
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.payload]
                };
                
            case shoppingList.START_EDIT :
                return {
                    ...state,
                    editedIngredientIndex:action.payload,
                    editedIngredient: {...state.ingredients[action.payload]}

                }
            
            case shoppingList.STOP_EDIT :
                return  {
                     ...state,  
                     editedIngredient:null,
                     editedIngredientIndex:-1 
                }

            case shoppingList.ADD_INGREDIENTS_FROM_RECIPES:
                return {
                    ...state,
                    ingredients: [...state.ingredients, ...action.payload]
                };
                
            case shoppingList.UPDATE_INGREDIENT:
                const ingredient = state.ingredients[action.payload.index]
                const updatedIngredient = {
                    ...ingredient,
                    ...action.payload.ingredient
                }
                const updatedIngredients = [...state.ingredients]
                updatedIngredients[action.payload.index] = updatedIngredient
                return {
                  ...state,
                  ingredients: updatedIngredients,
                  editedIngredient:null,
                  editedIngredientIndex:-1 
                  
                };
                
            case shoppingList.DELETE_INGREDIENT: 
                return {
                    ...state,
                    ingredients:state.ingredients.filter((item,index)=>{
                            return index != action.payload
                    }),
                    editedIngredient:null,
                    editedIngredientIndex:-1 
                    
                }
                

            default:
                return state;
        }
    
}
