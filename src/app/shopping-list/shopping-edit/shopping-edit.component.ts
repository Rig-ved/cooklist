import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  
  @ViewChild('unitInput') unitInput: ElementRef;
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  
  
  constructor(private shoppingListServ: shoppingListService) { }

  ngOnInit() {
  }

  onAdd() {
    const ingName =  this.nameInput.nativeElement.value;
    const ingAmount =  this.amountInput.nativeElement.value;
    const ingValuye =  this.unitInput.nativeElement.value;
    this.shoppingListServ.addIngredient(new Ingredient(ingName,ingAmount,ingValuye))
   

  }
  onDelete() {

  }
  onClear() {

  }


}
