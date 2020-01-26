import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth/auth.service';
import { Subscription } from 'rxjs';
import { AppState } from './app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../app/auth/auth/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'zephy-work';
  loadedFeature: string = "recipe" 
  autoLoginSubscription:Subscription

  constructor( private authService:AuthService,
    private store :Store<AppState>) {
    
   }

   ngOnInit(): void {
     this.store.dispatch(new AuthActions.AutoLoginAction())
  }
}
