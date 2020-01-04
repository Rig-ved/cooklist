import { Component, OnInit, OnDestroy} from '@angular/core';
import {RecipesModel} from '../recipes.model'
import { RecipeService } from 'src/app/shared/recipes.services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { UserModel } from 'src/app/auth/auth/user.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipeAddSubscription:Subscription
  recipes:RecipesModel[];
  recipesLoaded = new Subject<RecipesModel[]>()
  constructor(
    private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute,
    private authService:AuthService) { }

  ngOnInit() {
      // SOMEHOW GET THE TOKEN EXPIRATION 
      
      this.authService.authenticatedUser.subscribe((user:UserModel)=>{
        if(!user) {
          return;
        }
        this.recipeService.getRecipes();
        this.recipeAddSubscription=this.recipeService.recipeAdded.subscribe((data:RecipesModel[])=>{
            this.recipes = data
            
        })
      })
     
  }

  onNewRecipeClick() {
      this.router.navigate(['new'],{relativeTo:this.route})
  }

  ngOnDestroy(): void {
    if(this.recipeAddSubscription)
      this.recipeAddSubscription.unsubscribe()
}
 

}
