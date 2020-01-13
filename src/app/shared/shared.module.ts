import { NgModule } from "@angular/core";
import { BetterHighlightDirective } from "./better-highlight.directive";
import { PlaceHolderDirective } from "./placeholder.directive";
import { UnlessDirective } from "./unless.directive";
import { ExampleComponent } from "../example/example.component";
import { BannerComponent } from "./banner/banner.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { CommonModule } from "@angular/common";
import { NgxIndexedDBModule, DBConfig } from "ngx-indexed-db";

// TODO MOVE TO ANOTHER MODULE
const dbConfig: DBConfig = {
  name: "RecipesDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "users",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "token", keypath: "token", options: { unique: false } },
        { name: "email", keypath: "email", options: { unique: false } }
      ]
    }
  ]
};
@NgModule({
  declarations: [
    BetterHighlightDirective,
    PlaceHolderDirective,
    UnlessDirective,
    ExampleComponent,
    BannerComponent,
    SpinnerComponent
  ],
  imports: [CommonModule, NgxIndexedDBModule.forRoot(dbConfig)],
  exports: [
    BetterHighlightDirective,
    PlaceHolderDirective,
    UnlessDirective,
    ExampleComponent,
    BannerComponent,
    SpinnerComponent
  ],
  entryComponents: [ExampleComponent]
})
export class SharedModule {}
