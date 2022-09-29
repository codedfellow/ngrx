import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getCounter } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  // @Input() counter: number = 0;  
  counter$: Observable<number> = new Observable<number>;
  // counter$: Observable<{ counter: number }> = new Observable<{ counter: number }>();
  // counter$: Observable<CounterState> = new Observable<CounterState>();
  counterSubscription: Subscription = new Subscription();
  constructor(private store: Store<{ counter: CounterState }>) { }
  ngOnDestroy(): void {
    // this.counterSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // this.counterSubscription = this.store.select('counter').subscribe(data => {
    //   this.counter = data.counter;
    // })

    // this.counter$ = this.store.select('counter');
    this.counter$ = this.store.select(getCounter);
  }

}
