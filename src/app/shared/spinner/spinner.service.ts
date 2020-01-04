import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable ({
    providedIn:'root'
})
export class SpinnerServcice {
    constructor(){

    }
    public shouldSpin = new Subject<Boolean>()
    showLoader() {
        this.shouldSpin.next(true)
    }

    hideLoader() {
        this.shouldSpin.next(false)
    }





}