import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { shoppingListService } from './shared/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeDetailResolver } from './recipes/recipe-detail/recipe-detail.resolver';
import { RecipeService } from './shared/recipes.services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingInterceptorService } from './shared/loadingInterceptor.service';
import { PasswordResetComponent } from './app/password-reset/password-reset.component';
import { RecipeModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { shoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		AuthComponent,
		PasswordResetComponent
	],
	imports: [
		BrowserModule,
		AngularFontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		NoopAnimationsModule,
		AppRoutingModule,
		RecipeModule,
		SharedModule,
		shoppingListModule
	],
	providers: [shoppingListService,
		RecipeService,
		{
			provide:HTTP_INTERCEPTORS,
			useClass:LoadingInterceptorService,
			multi:true
		},
		RecipeDetailResolver
		

	],
	
	bootstrap: [AppComponent]
})
export class AppModule { }
