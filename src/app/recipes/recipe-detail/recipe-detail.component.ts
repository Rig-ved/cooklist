import { Component, OnInit, Input } from '@angular/core';
import { RecipesModel } from '../recipes.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RecipeService } from 'src/app/shared/recipes.services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(1600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(1600, style({opacity: 0})))
    ])
  ]

  
})
export class RecipeDetailComponent implements OnInit {

  @Input() selectedRecipe:RecipesModel
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
  }

  addToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients)
  }

}
