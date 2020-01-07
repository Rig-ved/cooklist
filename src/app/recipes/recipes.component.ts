import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { RecipeService } from '../shared/recipes.services';
import { AuthService } from '../auth/auth/auth.service';
import { UserModel } from '../auth/auth/user.model';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { ExampleComponent } from '../example/example.component';
import { PlaceHolderDirective } from '../shared/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  
})
export class RecipesComponent implements OnInit {
  
  @ViewChild(PlaceHolderDirective) reference : PlaceHolderDirective
  constructor( private authService : AuthService,private componentfactory:ComponentFactoryResolver) { }

  ngOnInit() {

    this.authService.authenticatedUser.
    pipe(
      takeWhile((user)=>{
          return user != null
      })
    ).
    subscribe((user:UserModel)=>{
      this.showWelcomeComp(user)
       
    })
    
  }

  showWelcomeComp(user) {
    let alertCompFactory = this.componentfactory.resolveComponentFactory(ExampleComponent)
    let containerRef = this.reference.vcRef
    containerRef.clear();
    const dynamicComp =  containerRef.createComponent(alertCompFactory);
    dynamicComp.instance.message = `Welcome ${user.email}`
    let subscription:Subscription=dynamicComp.instance.close.subscribe(()=>{
        subscription.unsubscribe()
        containerRef.clear();
    }) 
  }

}
