import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipesModel } from "../recipes.model";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { RecipeService } from "src/app/shared/recipes.services";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";
import { map, take, switchMap, exhaustMap, mergeMap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth/auth.service";
import { Subscription, throwError } from "rxjs";
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { RecipesState } from '../store/recipes.reducer';

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
  animations: [
    // the fade-in/fade-out animation.
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 0 }), animate(1600)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(":leave", animate(1600, style({ opacity: 0 })))
    ])
  ]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selectedRecipe: RecipesModel;
  id: number;
  selectedRecipeSubs: Subscription;
  recipeSub :Subscription
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private store:Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    //let id: number;
    debugger
    this.selectedRecipeSubs = this.route.params.pipe(
      map( (params:Params) =>{
        if(params['id'])
          return +params['id']
      }),
      mergeMap((id:number)=>{
          this.id=id
          return this.store.select('recipesList')
      }),
      map((recipesState:RecipesState)=>{
          return recipesState.recipes.filter((recipe,index)=>{
              return index === this.id
          }).shift()
      })
    ).subscribe((recipe:RecipesModel)=>{
      if(recipe)
        this.selectedRecipe = recipe
    })
    
    
    
  }
  ngOnDestroy() {
    if(this.selectedRecipeSubs)
    this.selectedRecipeSubs.unsubscribe();
    if(this.recipeSub)
    this.recipeSub.unsubscribe()
  }
  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      (this.selectedRecipe.ingredients) as Ingredient[]
    );
  }
  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"], { relativeTo: this.route });
  }
}
