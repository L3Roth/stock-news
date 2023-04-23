import 'jasmine';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicNewsService } from './services/dynamic-news.service';
import { News } from './interfaces/news-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = "stock-news-app";
  searchKeyword: string = '';
  searchResults: News[] = [];
  searchError = '';

  constructor(private newsService: DynamicNewsService) {}

  searchNews(): void {
    if (this.searchKeyword.trim()) {
      this.newsService.searchNews(this.searchKeyword.trim()).subscribe(
        (news) => {
          this.searchResults = news;
        },
        (error) => {
          console.error('Error fetching news: ', error);
          // Do something with the error, e.g. show an error message to the user
          this.searchError = error;
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}