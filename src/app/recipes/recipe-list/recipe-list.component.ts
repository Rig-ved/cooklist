import { Component, OnInit, OnDestroy} from '@angular/core';
import {RecipesModel} from '../recipes.model'
import { RecipeService } from 'src/app/shared/recipes.services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataStorageService } from 'src/app/shared/data-store.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipeAddSubscription:Subscription
  recipes:RecipesModel[];
  constructor(private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
      console.log(environment)
      this.recipeService.getRecipes();
      this.recipeAddSubscription=this.recipeService.recipeAdded.subscribe((data:RecipesModel[])=>{
          this.recipes = data
      })
  }

  onNewRecipeClick() {
      this.router.navigate(['new'],{relativeTo:this.route})
  }

  ngOnDestroy(): void {
    this.recipeAddSubscription.unsubscribe()
}
 

}
