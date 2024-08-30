import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Recipe[] | undefined;

  constructor(
    private recipesService: RecipesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter () {
    this.recipes = this.recipesService.getAllRecipes();
  }

  onLogout () {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
