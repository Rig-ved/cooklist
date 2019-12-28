import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipes.services';
import { RecipesModel } from '../recipes.model';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  isRecipeExist:Boolean = false
  constructor(
    private recipeServ:RecipeService
  ) { }

  ngOnInit() {
      this.recipeServ.recipeAdded.subscribe((item:RecipesModel[])=>{
        this.isRecipeExist = item.length >= 0
      })
      
  }

}
