import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { changeChannelName, customIncrement } from '../state/counter.actions';
import { getChannelName } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value: number = 0;
  channelName$: Observable<string> = new Observable<string>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select(getChannelName).subscribe(channelName => {
    //   this.channelName = channelName;
    // })
    this.channelName$ = this.store.select(getChannelName);
  }

  onAdd() {
    // console.log(this.value);
    this.store.dispatch(customIncrement({value: this.value}))
  }

  onChangeChanneName() {
    this.store.dispatch(changeChannelName());
  }
}
