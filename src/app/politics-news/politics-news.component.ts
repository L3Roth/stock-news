import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

import { News } from '../interfaces/news-interface';
import { DynamicNewsService } from '../services/dynamic-news.service';

@Component({
  selector: 'app-politics-news',
  templateUrl: './politics-news.component.html',
  styleUrls: ['./politics-news.component.scss']
})
export class PoliticsNewsComponent {
  politicsNews: News[] = [];

  constructor(private newsService: DynamicNewsService) {}

  ngOnInit() {
    this.newsService.getDynamicNews('politics OR senate OR election').then(articles => {
      this.politicsNews = articles;
    });
  }

}
