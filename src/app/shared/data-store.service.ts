
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { RecipeService } from './recipes.services';
import { RecipesModel } from '../recipes/recipes.model';
import { EnvService } from '../env.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as RecipesActions from '../recipes/store/recipes.actions'
// import { AuthService } from '../auth/auth/auth.service'

@Injectable({providedIn:'root'})
export class DataStorageService {
    constructor(private http :HttpClient,
        private recipeService:RecipeService,
        private store:Store<AppState>,
        private envService :EnvService
       
       ){}
    
    storeRecipes() {
        let recipesList = this.recipeService.getRecipes();
        let url = this.envService.post +'recipes.json'
        return this.http.put(url,recipesList).subscribe((response)=>{
            console.log(response);
        })
    }

    fetchRecipes() {
        let url = this.envService.post +'recipes.json';
        return this.http
            .get<RecipesModel[]>(url)
            .pipe(
                map(recipes => {
                  return recipes.map(recipe => {
                    return {
                      ...recipe,
                      ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                  });
                }),
                tap(recipes => {
                 // this.recipeService.setRecipesFromDB(recipes);
                 this.store.dispatch( new RecipesActions.SetRecipesAction(recipes))
                })
              )
        
    }
    
}



// fetchRecipes() {
//   let url = serverUrl.post + "recipes.json";
//   // take tells RX JS to take only one value from that observable
//   // and thereafter it automatically unsubscribes

//   // exhaust Map waits for the user observable to complete and thereafter 
//   // it gives us the user we get from the previous observable and now we return 
//   // the complete the http call from inside exhaust Map passing in that function 

//  return this.authService.authenticatedUser.pipe(
//     take(1),
//     exhaustMap((user: UserModel) => {
//       return this.http.get<RecipesModel[]>(url,
//           {
//             params:new HttpParams().append('auth',user.token)
//           }
//       );
//     }),
//     map(recipes => {
//       return recipes.map(recipe => {
//         return { 
//           ...recipe,
//           ingredients: recipe.ingredients ? recipe.ingredients : []
//         };
//       });
//     }),
//     tap(recipes => {
//       this.recipeService.setRecipesFromDB(recipes);
//     })
//   );
// }