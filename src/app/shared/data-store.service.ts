import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { RecipeService } from './recipes.services';
import { serverUrl } from 'src/environments/environment';
import { RecipesModel } from '../recipes/recipes.model';

@Injectable({providedIn:'root'})
export class DataStorageService {
    constructor(private http :HttpClient,
        private recipeService:RecipeService,
       ){}
    
    storeRecipes() {
        let recipesList = this.recipeService.getRecipes();
        let url = serverUrl.post +'recipes.json'
        return this.http.put(url,recipesList).subscribe((response)=>{
            console.log(response);
        })
    }

    fetchRecipes() {
        let url = serverUrl.post +'recipes.json';
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
                  this.recipeService.setRecipesFromDB(recipes);
                })
              )
        
    }
    
}