import { Component, OnInit, Input } from '@angular/core';
import { RecipesModel } from '../../recipes.model';
import { RecipeService } from 'src/app/shared/recipes.services';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('recipe') recipe: RecipesModel;
  @Input() index:number
  constructor() { }

  ngOnInit() {
   
  }
  

}
