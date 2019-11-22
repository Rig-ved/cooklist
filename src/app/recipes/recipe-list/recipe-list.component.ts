import { Component, OnInit} from '@angular/core';
import {RecipesModel} from '../recipes.model'
import { RecipeService } from 'src/app/shared/recipes.services';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

 
 
  recipes:RecipesModel[];
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
      this.recipes= this.recipeService.getRecipes();
  }
 

}
