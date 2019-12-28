import { Component, OnInit } from "@angular/core";
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
import { map } from "rxjs/operators";

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
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: RecipesModel;
  id: number;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((data:Params) => {
          return +data["id"];
        })
      )
      .subscribe((params) => {
        this.id = params;
        this.selectedRecipe = this.recipeService.getRecipe(this.id);
        
      });


  //   this.route.params.subscribe((data:Params)=>{
  //     this.id=+data['id']
  //   })
  //   this.route.data
  //     .subscribe(
  //       (data: Data) => {
  //         this.selectedRecipe = data['detail']
          
  //       }
  //     );
  // }
  }
  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.selectedRecipe.ingredients
    );
  }
  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'],{relativeTo:this.route})
  }
}
