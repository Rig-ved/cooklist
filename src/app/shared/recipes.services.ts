import { RecipesModel } from '../recipes/recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { EnvService } from '../env.service';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../shopping-list/store/shopping-list.actions'
import { AppState } from '../app.reducer';

@Injectable({
    providedIn:'root'
})
export class RecipeService {
    recipeSelected = new EventEmitter<RecipesModel>();
    recipeAdded = new Subject<RecipesModel[]>();
    recipeSingle= new BehaviorSubject<RecipesModel[]>(null)


    constructor(

        private http:HttpClient,
        private envService:EnvService,
        private store:Store<AppState>
        ){}
        private recipes :  RecipesModel[] =[
        //** */
    ]

    setRecipesFromDB(items : RecipesModel[]) {
        this.recipes = items;
        this.recipeAdded.next(this.recipes.slice());
        this.recipeSingle.next(this.recipes.slice())
    }

    
    getRecipes() {
        return this.http.get(this.envService.post+'recipes.json')
        .pipe(
            // Use Pipe to transform the non mandatory request 
            map((recipes:RecipesModel[])=>{
                return  recipes.map(function(item){
                     item.ingredients = item.ingredients ? item.ingredients:[]
                     return item;
                })
            }),tap((items:RecipesModel[])=>{
                   // this.setRecipesFromDB(items)
            })
        )
        // return this.recipes.slice()
    }
    getRecipe(){
      return  this.recipeSingle.next(this.recipes.slice());
       
    }
    addRecipes(recipe:RecipesModel){
        this.recipes.push(recipe);
        this.recipeAdded.next(this.recipes.slice())
    }
    updateRecipes(index:number,recipe:RecipesModel){
        this.recipes[index] = recipe
        this.recipeAdded.next(this.recipes.slice())
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeAdded.next(this.recipes.slice())
        
    }
    addIngredientsToShoppingList(ingredients:Ingredient[]){
        // this.shoppingListService.addIngredientsFromRecipes(ingredient)
        this.store.dispatch(new shoppingListActions.AddIngredientsFromRecipes(ingredients))
    }
    
}

// getRecipes() {
//     this.authService.authenticatedUser
//       .pipe(
//         take(1),
//         exhaustMap((user: UserModel) => {
//           return this.http.get(serverUrl.post + "recipes.json", {
//             params: new HttpParams().append("auth", user.token)
//           });
//         }),
//         map((recipes: RecipesModel[]) => {
//           return recipes.map(function(item) {
//             item.ingredients = item.ingredients ? item.ingredients : [];
//             return item;
//           });
//         }),
//         catchError((error:HttpErrorResponse)=>{
//             return throwError(error);
//         }),
//         tap((items: RecipesModel[]) => {
//           console.log("Coming inside from tap in service" + items);
//         })
//       )
//       .subscribe(
//         // Successful responses call the first callback.
//         (items: RecipesModel[]) => {
//           this.setRecipesFromDB(items)
//         },(err) =>{
//             throw new Error(err);
//         }
//         // Errors will call this callback instead:
        
//       );

//     // return this.recipes.slice()
//   }



//** */

// new RecipesModel('Murgh Bhuna',
        // 'A simple recipe',
        // 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/indian.jpg',
        // [
        //     new Ingredient('Bun',20,'tbsp'),
        //     new Ingredient('Meat',3,'kg')
        // ]),
        // new RecipesModel('Murgh Mussallam',
        // 'A complex recipe',
        // 'https://asset.slimmingworld.co.uk/content/media/11596/jackfruit-chilli-iceland_sw_recipe.jpg?v1=JGXiore20qg9NNIj0tmc3TKfKw-jr0s127JqqpCA2x7sMviNgcAYh1epuS_Lqxebn9V_qusKHfwbF7MOUrAPptzBhXIUL1Xnq2Mmdvx4fOk&width=320&height=320',
        // [
        //     new Ingredient('Fries',10,'tbsp'),
        //     new Ingredient('Meat',1,'kg')

        // ])