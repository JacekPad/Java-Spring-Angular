import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitlePageService {

  private titlePageSubj: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public titlePage: Observable<string> = this.titlePageSubj.asObservable();
  title: string = "";
  constructor() { }

  setTitle(title: string) {
    this.titlePageSubj.next(title);
  }
}
