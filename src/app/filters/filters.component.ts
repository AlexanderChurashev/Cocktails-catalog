import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {CocktailService} from '../../services/cocktail.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
    filters$: Observable<string[]>;
    form = new FormGroup({});

    constructor(private cocktailService: CocktailService, private router: Router) {
    }

    ngOnInit() {
        this.filters$ = this.cocktailService.getAllFilter$();
    }

    getFiltersCocktail() {
        const filters = Object.entries(this.form.value)
            .filter(([key, value]: [string, boolean]) => value)
            .map(([key, value]: [string, boolean]) => key);
        this.cocktailService.setFilter(filters);
        this.router.navigate(['drinks']);
    }

    goDrinks() {
        this.router.navigate(['drinks']);
    }

}
