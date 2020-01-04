import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerServcice } from './spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit,OnDestroy {
 
  shouldSpin:boolean= false ;
  spinSubscription:Subscription;
  constructor(
    private spinnerServ:SpinnerServcice
  ) { }

  ngOnInit() {
    this.spinSubscription=this.spinnerServ.shouldSpin.subscribe( (item:boolean)=>{
      
      this.shouldSpin = item;

    })

  }
  ngOnDestroy(): void {
    this.spinSubscription.unsubscribe()
  }

}
