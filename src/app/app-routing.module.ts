import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FiltersComponent} from './filters/filters.component';
import {DrinksPage} from './drinks/drinks-page.component';

const routes: Routes = [
  {
    path: 'drinks',
    component: DrinksPage
  },
  {
    path: 'filters',
    component: FiltersComponent,
  },
  {
    path: '',
    redirectTo: 'drinks',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
