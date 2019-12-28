import { Component, OnInit, OnDestroy } from '@angular/core';
import { BannerService, BannerInterface } from './banner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit,OnDestroy {
 
  message:string ;
  messageType:string;
  showBanner:boolean;
  bannerSubscription :Subscription
  constructor( private bannerService:BannerService) { }

  ngOnInit() {
      this.bannerSubscription = this.bannerService.bannerSubject.subscribe((data:BannerInterface)=>{
        if(!data) {
          return 
        }
        this.message = data.message
        this.messageType=data.messageType
        this.showBanner = data.showBanner

      })

  }

  hideBanner() {
    this.bannerService.hideBanner();
    this.bannerSubscription = this.bannerService.bannerSubject.subscribe((data:BannerInterface)=>{
      this.showBanner = data.showBanner

    })
  }

  ngOnDestroy(): void {
    this.bannerSubscription.unsubscribe()
  }


}
