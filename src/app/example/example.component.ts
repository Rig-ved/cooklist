import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {


  @Input('message') message:string
  @Output() close= new EventEmitter<void>()
  constructor() { }

  ngOnInit() {
  }
  // oddNumbers = [1, 3, 5];
  // evenNumbers = [2, 4];
  // onlyOdd = false;
  // colorObject:object = {
  //   defaultColor:'transparent',
  //   highlightColor:'red'
  // } 

  // value = 5;
  onClose () {
    this.close.emit()
  }

}
