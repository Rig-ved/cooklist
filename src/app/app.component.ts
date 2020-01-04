import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'zephy-work';
  loadedFeature: string = "recipe" 
  autoLoginSubscription:Subscription

  constructor( private authService:AuthService) {
    this.authService.autoLogin()
   }

   ngOnInit(): void {
     
  }
}
