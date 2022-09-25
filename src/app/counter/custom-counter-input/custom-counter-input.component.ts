import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { customIncrement } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value: number = 0;
  constructor(private store: Store<{counter: CounterState}>) { }

  ngOnInit(): void {
  }

  onAdd() {
    // console.log(this.value);
    this.store.dispatch(customIncrement({value: this.value}))
  }
}
