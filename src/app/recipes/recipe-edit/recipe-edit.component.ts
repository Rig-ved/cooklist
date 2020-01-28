/**
 * @author Anirban bhattacharya
 * @email anirban.bhattacharya@prgx.com
 * @create date 2019-12-09 18:57:01
 * @modify date 2019-12-09 18:57:01
 * @desc The recipe edit component
 */
import { Component, OnInit, OnDestroy } from "@angular/core";
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
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { RecipesState } from '../store/recipes.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit,OnDestroy {
  id: number;
  editMode: boolean = false;
  editedRecipe:RecipesModel;
  recipeEditSubscription:Subscription
  recipeForm: FormGroup;
  cardName:string = "New Recipe"
  constructor(
    private route: ActivatedRoute,
    private store:Store<AppState>,
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
      
     this.recipeEditSubscription =  this.store.select('recipesList').pipe(
        map((recipeState:RecipesState)=>{
            return recipeState.recipes.find((item,index)=>{
              return index===this.id
            })
        })
      ).subscribe((recipe:RecipesModel)=>{
          this.editedRecipe = recipe;
      })

      this.cardName = "Edit Recipe"
      recipeName = this.editedRecipe.name;
      recipeDescription = this.editedRecipe.description;
      recipeImagePath = this.editedRecipe.imagePath;
      if (this.editedRecipe["ingredients"]) {
        for (let ingredient of this.editedRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'amount': new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
              'unit': new FormControl(ingredient.unit,
                Validators.required),
              'name': new FormControl(ingredient.name,Validators.required)
            })
          );
        }
      }
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
  ngOnDestroy():void {
      this.recipeEditSubscription ? this.recipeEditSubscription.unsubscribe():''
  }
}
