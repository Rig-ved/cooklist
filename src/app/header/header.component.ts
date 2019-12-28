import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-store.service';
import { RecipesModel } from '../recipes/recipes.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStore:DataStorageService) { }
  ngOnInit() {
  }
  onSaveDataToDB() {
    this.dataStore.storeRecipes()
  }
  fetchRecipesFromDB(){
    this.dataStore.fetchRecipes().subscribe()
  }

}
