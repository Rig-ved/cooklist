import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from "@angular/router";


const appRoutes: Routes = [
  {path:'',redirectTo:'/recipes',pathMatch:'full'},
  {
    path: "recipes",
    loadChildren:'./recipes/recipes.module#RecipeModule',
  },
  {
    path: "shopping-list",
    loadChildren: './shopping-list/shopping-list.module#shoppingListModule'

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


// loadChildren:'./recipes/recipes.module#RecipeModule',
// loadChildren:'./shopping-list/shopping-list.module#shoppingListModule',
// login
// password-reset