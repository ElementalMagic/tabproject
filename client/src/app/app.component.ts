import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LinksService} from './services/links.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private linkService: LinksService) {
  }

  @ViewChild('modal') modal: ElementRef;

  title = 'TAB PROJECT';
  links = [];
  rows = [];
  newLinkName = '';
  newLinkTitle = '';
  newLinkUrl = '';

  itemDeletingInfo: { id: string, index: number, title: string };

  ngOnInit() {
    this.linkService.getLinks().subscribe(res => {
      this.links = res;
      for (let i = 0; i < this.links.length; i++) {
        if (i + 1 % 3 === 1) {
          const newRow = [];
          newRow.push(this.links[i]);
          if (this.links[i + 1]) {
            newRow.push(this.links[i + 1]);
          }
          if (this.links[i + 2]) {
            newRow.push(this.links[i + 2]);
          }

          this.rows.push(newRow);
        }
      }
      console.log(this.rows);
    });
  }

  addNewLink() {
    this.linkService.postLinks(
      {
        name: this.newLinkName,
        title: this.newLinkTitle,
        url: this.newLinkUrl
      }).subscribe(
      res => {
        this.links.push(res);
        if (this.rows[this.rows.length - 1].length !== 3) {
          this.rows[this.rows.length - 1].push(res);
        } else {
          this.rows.push([res]);
        }
      }
    );
  }

  modalDelete($event) {
    this.linkService.deleteLink(this.itemDeletingInfo.id).subscribe(res => {
      console.log(res);
      this.links.splice(this.itemDeletingInfo.index, 1);
      this.rows.forEach((item, idx) => {
        console.log(item);
        const index = item.findIndex(p => {
          return p._id === this.itemDeletingInfo.id;
        });

        console.log(index);
        if (index !== (-1)) {
          item.splice(index, 1);
        }
      });
    });
  }
}
