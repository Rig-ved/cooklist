import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() tabSelected = new EventEmitter<string>();
  @ViewChild('tabSelect') tabSelect: ElementRef
  constructor() { }

  ngOnInit() {
  }

  onClickTabs(tab:string,event) {
    
    event.target.classList.add('active')
    this.tabSelected.emit(tab)
  }

}
