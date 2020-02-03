import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuard } from '../auth/auth/auth.guard';
import { RecipeDetailResolver } from './recipe-detail/recipe-detail.resolver';

// import { AuthGuard } from './auth/auth/auth.guard';

const appRoutes:Routes = [
    {path:'',
    component:RecipesComponent,
    canActivate: [AuthGuard],
    children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent,resolve: {recipeResolver: RecipeDetailResolver}},
        {path:':id/edit',component:RecipeEditComponent,resolve: {recipeResolver: RecipeDetailResolver}}

    ]},
    
]
@NgModule ({
    exports :[
        RouterModule
    ],
    imports:[
        RouterModule.forChild(appRoutes)
    ]
})
export class RecipeRoutingModule{

}