import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailResolver } from './recipes/recipe-detail/recipe-detail.resolver';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './auth/auth/auth.guard';
import { PasswordResetComponent } from './app/password-reset/password-reset.component';



const appRoutes:Routes = [

    {path:'',redirectTo:'/recipes',pathMatch:'full'},
    {path:'login',component:AuthComponent,data: {background: '/assets/images/background.jpg'}},
    {path:'password-reset',component:PasswordResetComponent},
    {path:'recipes',
   // canActivate:[AuthGuard],
    component:RecipesComponent,children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent},
        {path:':id/edit',component:RecipeEditComponent}

    ]},
    {path:'shopping-list', //canActivate:[AuthGuard],
    component:ShoppingListComponent},
]



@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]

})


export class AppRoutingModule {

}