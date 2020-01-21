import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-store.service';
import { AuthService } from '../auth/auth/auth.service';
import { UserModel } from '../auth/auth/user.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/auth/store/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  authSubscription: Subscription;
  isAuthenticated:boolean = false;
  
  constructor(
    private authService:AuthService,
    private router : Router,
    private store:Store<AppState>,
    private route:ActivatedRoute,
    private dataStore:DataStorageService) { }
  ngOnInit() {
    // TODO pass from app component where the authorization should be 
    this.authSubscription  = this.authService.authenticatedUser.subscribe((user:UserModel)=>{
          this.isAuthenticated = !!user
    })
  
  }

  logout() {
    // this.authService.logout()
    this.store.dispatch(new AuthActions.Logout())
  }
  onSaveDataToDB() {
    this.dataStore.storeRecipes()
  }
  fetchRecipesFromDB(){
    this.dataStore.fetchRecipes().subscribe()
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }
}
