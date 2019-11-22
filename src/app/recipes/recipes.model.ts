import { Ingredient } from '../shared/ingredient.model';



export class RecipesModel {
    constructor(
        public name: string,
        public description: string,
        public imagePath: string,
        public ingredients:Ingredient[]
    ) {
    }

}