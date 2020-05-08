import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss'],
})
export class FilterItemComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() filter: string;

  constructor() { }

  ngOnInit() {
    this.form.addControl(this.filter, new FormControl(true));
  }

}
