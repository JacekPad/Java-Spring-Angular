import { Component, OnInit } from '@angular/core';
import { TitlePageService } from '../title-page.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public title: string = "";



  constructor(private titleService: TitlePageService) {
    titleService.titlePage.subscribe(title => {
      this.title = title;
    })

  }

}
