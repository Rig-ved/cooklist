/**
 * @author Anirban bhattacharya
 * @email anirban.bhattacharya@prgx.com
 * @create date 2019-12-09 18:57:01
 * @modify date 2019-12-09 18:57:01
 * @desc The recipe edit component
 */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params["id"]) {
        this.id = +params["id"];
      }
      this.editMode = params["id"] != null;
      
    });
  }
}
