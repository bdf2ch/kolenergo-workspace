import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Tab } from './tab.model';
import { Observable } from 'rxjs/Observable';

export class TabsManager {
  private tabs$: BehaviorSubject<Tab[]>;
  private selectedTab$: BehaviorSubject<Tab>;

  constructor() {
    this.tabs$ = new BehaviorSubject<Tab[]>([]);
    this.selectedTab$ = new BehaviorSubject<Tab>(null);
  }

  tabs(): Observable<Tab[]> {
    return this.tabs$.asObservable();
  }

  add(tab: Tab): Tab {
    this.tabs$.next(this.tabs$.getValue().concat([tab]));
    return tab;
  }

  select(tab: Tab) {
    this.tabs$.getValue().forEach((item: Tab) => {
      item.isSelected = item.id === tab.id;
    });
  }

  selected(): Observable<Tab> {
    return this.selectedTab$.asObservable();
  }
}
