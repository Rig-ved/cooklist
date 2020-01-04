import { RecipesModel } from '../recipes/recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { shoppingListService } from './shopping-list.service';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<RecipesModel>();
    recipeAdded = new Subject<RecipesModel[]>()


    constructor(private http:HttpClient,private shoppingListService:shoppingListService){}
    private recipes :  RecipesModel[] =[
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
    ]

    setRecipesFromDB(items : RecipesModel[]) {
        this.recipes = items;
        this.recipeAdded.next(this.recipes.slice());
    }

    
    getRecipes() {
        return this.http.get(serverUrl.post+'recipes.json')
        .pipe(
            // Use Pipe to transform the non mandatory request 
            map((recipes:RecipesModel[])=>{
                return  recipes.map(function(item){
                     item.ingredients = item.ingredients ? item.ingredients:[]
                     return item;
                })
            }),tap((items:RecipesModel[])=>{
                    console.log('Coming inside from tap in service' +items);
            })
        ).subscribe( 
            // Successful responses call the first callback.
            (items:RecipesModel[]) => {
                this.setRecipesFromDB(items)
            },
            // Errors will call this callback instead:
            (err) => {
              console.log(err);
            })
        // return this.recipes.slice()
    }
    getRecipe(){
        this.recipeAdded.next(this.recipes.slice())
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
    addIngredientsToShoppingList(ingredient:Ingredient[]){
        this.shoppingListService.addIngredientsFromRecipes(ingredient)
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