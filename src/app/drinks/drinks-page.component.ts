import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CocktailService} from '../../services/cocktail.service';
import {Router} from '@angular/router';
import {IDrinksAndTitle} from '../../interfaces/drinks-and-title';

@Component({
    selector: 'app-home',
    templateUrl: 'drinks-page.component.html',
    styleUrls: ['drinks-page.component.scss'],
})
export class DrinksPage implements OnInit {
    cocktails$: Observable<IDrinksAndTitle[]>;

    constructor(private cocktailService: CocktailService, private router: Router) {
    }

    ngOnInit() {
        this.cocktailService.init();
        this.cocktails$ = this.cocktailService.getDrinks$();
    }

    goFilters() {
        this.router.navigate(['filters']);
    }
}
