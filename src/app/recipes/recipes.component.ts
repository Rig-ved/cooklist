import { Component, OnInit } from '@angular/core';
import { RecipesModel } from './recipes.model';
import { RecipeService } from '../shared/recipes.services';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe:RecipesModel
  constructor( private recipeService:RecipeService) { }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe((data:RecipesModel)=>{
      this.selectedRecipe = data;
    })
  }

}
