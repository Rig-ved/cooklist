import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-store.service';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/auth/store/auth.actions'
import { map } from 'rxjs/operators';
import * as RecipeActions from '../recipes/store/recipes.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  userSub: Subscription;
  isAuthenticated:boolean = false;
  
  constructor(
    private store:Store<AppState>,
    private dataStore:DataStorageService) { }
  ngOnInit() {
    // TODO pass from app component where the authorization should be 
    this.userSub = this.store
    .select('authList')
    .pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  
  }

  logout() {
    // this.authService.logout()
    this.store.dispatch(new AuthActions.LogoutAction())
  }
  onSaveDataToDB() {
    this.dataStore.storeRecipes()
  }
  fetchRecipesFromDB(){
      this.store.dispatch(new RecipeActions.GetRecipeForDetailAction())
  }
  ngOnDestroy(): void {
    if(this.userSub) {
      this.userSub.unsubscribe()
    }
  }
}
