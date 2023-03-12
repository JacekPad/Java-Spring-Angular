import { ChangeDetectionStrategy } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TitlePageService } from '../title-page.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public titleSub?: Observable<string>;

  constructor(private titleService: TitlePageService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.titleSub = this.titleService.titlePage;
  };

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

}
