import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {IDrinks} from '../interfaces/drinks';
import {environment} from '../environments/environment';
import {IDrinkFilter} from '../interfaces/drink-filter';
import {IDrinksAndTitle} from '../interfaces/drinks-and-title';

@Injectable({
    providedIn: 'root'
})
export class CocktailService {
    filters$ = new BehaviorSubject(['Ordinary Drink']);
    drinks$ = new BehaviorSubject<IDrinksAndTitle[]>([]);

    constructor(private http: HttpClient) {
    }

    getDrinks$(): Observable<IDrinksAndTitle[]> {
        return this.drinks$.asObservable();
    }

    getAllFilter$(): Observable<string[]> {
        return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`).pipe(
            map((value: IDrinkFilter) => value.drinks.map((drink) => drink.strCategory))
        );
    }

    setFilter(filters: string[]) {
        this.filters$.next(filters);
    }

    init() {
        this.filters$.pipe(
            switchMap((filters) => this.makeMultiRequest(filters))
        ).subscribe((drinks: IDrinksAndTitle[]) => this.drinks$.next(drinks));
    }

    makeRequest(filter: string): Observable<IDrinks> {
        return this.http.get<IDrinks>(`${environment.apiURL}=${filter}`);
    }

    makeMultiRequest(filters: string[]): Observable<IDrinksAndTitle[]> {
        return forkJoin(filters.reduce((prev, next) => ({...prev, [next]: this.makeRequest(next)}), {}))
            .pipe(
                map((result: Record<string, IDrinks>) => Object.entries(result)
                    .map(([key, value]: [string, IDrinks]) => ({title: key, items: value.drinks}))),
            );
    }
}
