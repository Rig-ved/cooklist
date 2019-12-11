import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { BetterHighlightDirective } from './shared/better-highlight.directive';
import { UnlessDirective } from './shared/unless.directive';
import { ExampleComponent } from './example/example.component';
import { shoppingListService } from './shared/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailResolver } from './recipes/recipe-detail/recipe-detail.resolver';
import { RecipeService } from './shared/recipes.services';

// // const routes: Routes = [
// // 	{ path: 'routePath', component: Component },
// // 	{ path: '**', pathMatch: 'full', redirectTo: 'routePath' }
// // ];

// export const appRouting = RouterModule.forRoot(routes);

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		RecipesComponent,
		RecipeListComponent,
		RecipeDetailComponent,
		RecipeItemComponent,
		ShoppingListComponent,
		ShoppingEditComponent,
		BetterHighlightDirective,
		UnlessDirective,
		ExampleComponent,
		RecipeStartComponent,
		RecipeEditComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		BrowserAnimationsModule,
		NoopAnimationsModule,
		AppRoutingModule
	],
	providers: [shoppingListService,RecipeService,RecipeDetailResolver],
	bootstrap: [AppComponent]
})
export class AppModule { }
