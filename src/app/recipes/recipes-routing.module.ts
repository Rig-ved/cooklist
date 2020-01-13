import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

// import { AuthGuard } from './auth/auth/auth.guard';

const appRoutes:Routes = [

    
    {path:'',
   // canActivate:[AuthGuard],
    component:RecipesComponent,children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent},
        {path:':id/edit',component:RecipeEditComponent}

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