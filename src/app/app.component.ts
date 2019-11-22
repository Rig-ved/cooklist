import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zephy-work';
  loadedFeature: string = "recipe" 

  constructor() { }

  onTabSelected(data: string) {
    if (data)
      this.loadedFeature = data;
  }
}
