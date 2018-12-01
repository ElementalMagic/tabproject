import {Component, OnInit} from '@angular/core';
import {LinksService} from './services/links.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private linkService: LinksService) {
  }
  title = 'TAB PROJECT';
  links = [];
  newLinkName = '';
  newLinkTitle = '';
  newLinkUrl = '';
  ngOnInit() {
    this.linkService.getLinks().subscribe(res => {
      this.links = res;
    });
  }

  addNewLink(){
    this.linkService.postLinks({name: this.newLinkName, title: this.newLinkTitle, url: this.newLinkUrl}).subscribe();
  }
}
