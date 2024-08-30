import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Guiso de Mondongo',
      imageUrl: 'https://www.serargentino.com/public/images/2018/12/guiso-mondongo-773x458.jpeg',
      ingredients: ['Mondongo', 'Garbanzos', 'Cebollas', 'Chorizo colorado']
    },
    {
      id: 'r2',
      title: 'Lasagna',
      imageUrl: 'https://images.ctfassets.net/hhv516v5f7sj/1AHBnS81eRgSBQwnkub3kF/f6a5d243c45d122ba4d419456c931d5c/lasagnabeeflite_1000x1000.jpg',
      ingredients: ['Espinaca', 'Ricota', 'Tapas de Lasagna', 'Queso rallado']
    }
  ];

  constructor () { }

  getAllRecipes () {
    return [...this.recipes];
  }

  getRecipe (recipeID: string) {
    return this.recipes.find(recipe => {
        return recipe.id === recipeID;
      });
  }

  deleteRecipe (recipeId: string | undefined) {
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== recipeId;
    });
  }
}
