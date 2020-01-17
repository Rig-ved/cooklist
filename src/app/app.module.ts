import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailResolver } from './recipes/recipe-detail/recipe-detail.resolver';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptorService } from './shared/loadingInterceptor.service';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { EnvServiceProvider } from './env.service.provider';
import { AuthModule } from './auth/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './store/app.reducer';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
	],
	imports: [
		BrowserModule,
		StoreModule.forRoot(AppReducer),
		AngularFontAwesomeModule,
		BrowserAnimationsModule,
		HttpClientModule,
		NoopAnimationsModule,
		AppRoutingModule,
		AuthModule,
		SharedModule
	
	],
	providers: [
		{
			provide:HTTP_INTERCEPTORS,
			useClass:LoadingInterceptorService,
			multi:true
		},
		RecipeDetailResolver,
		EnvServiceProvider
		

	],
	
	bootstrap: [AppComponent]
})
export class AppModule { }
