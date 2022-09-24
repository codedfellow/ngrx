import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  // counter: number | undefined;
  constructor() { }

  ngOnInit(): void {
   
  }

  // onIncrement() {
  //   // this.counter++;
  // }

  // onDecrement() {
  //   // this.counter--;
  // }

  // onReset() {
  //   // this.counter = 0;
  // }
}
