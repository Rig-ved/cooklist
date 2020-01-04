/**
 * @author Anirban bhattacharya
 * @email anirban.bhattacharya@prgx.com
 * @create date 2019-12-09 18:57:01
 * @modify date 2019-12-09 18:57:01
 * @desc The recipe edit component
 */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map } from "rxjs/operators";
import {
  FormGroup,
  FormControl,
  Validators,
  FormControlName,
  FormArray
} from "@angular/forms";
import { RecipeService } from "src/app/shared/recipes.services";
import { RecipesModel } from '../recipes.model';

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  cardName:string = "New Recipe"
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router:Router,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((data: Params) => {
          return +data["id"];
        })
      )
      .subscribe(data => {
        if (data !=null) {
         
          this.id = data;
        }
        this.editMode = !isNaN(data);
        this.initForm();
       
      });
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      
      // const recipe = this.recipeService.getRecipe(this.id);
      // this.cardName = "Edit Recipe"
      // recipeName = recipe.name;
      // recipeDescription = recipe.description;
      // recipeImagePath = recipe.imagePath;
      // if (recipe["ingredients"]) {
      //   for (let ingredient of recipe.ingredients) {
      //     recipeIngredients.push(
      //       new FormGroup({
      //         'amount': new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
      //         'unit': new FormControl(ingredient.unit,
      //           Validators.required),
      //         'name': new FormControl(ingredient.name,Validators.required)
      //       })
      //     );
      //   }
      // }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
  }
  get controls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
   (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'unit': new FormControl(null,Validators.required),
      'name': new FormControl(null,Validators.required)
    })
   )
  }

  onDeleteIngredient(i:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i)
  }
  onSubmit() {
    if(this.editMode){
        this.recipeService.updateRecipes(this.id,this.recipeForm.value)
    } else {
        this.recipeService.addRecipes(this.recipeForm.value)
    }
    this.onCancelRecipe()
  }

  onCancelRecipe() {
      this.router.navigate(['../'],{relativeTo:this.route})
  }
}
