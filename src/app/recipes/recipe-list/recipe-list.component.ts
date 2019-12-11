import { Component, OnInit} from '@angular/core';
import {RecipesModel} from '../recipes.model'
import { RecipeService } from 'src/app/shared/recipes.services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

 
 
  recipes:RecipesModel[];
  constructor(private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
      this.recipes= this.recipeService.getRecipes();
  }

  onNewRecipeClick() {
      this.router.navigate(['new'],{relativeTo:this.route})
  }
 

}
