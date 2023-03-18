import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

import { News } from '../interfaces/news-interface';
import { DynamicNewsService } from '../services/dynamic-news.service';

@Component({
  selector: 'app-crypto-news',
  templateUrl: './crypto-news.component.html',
  styleUrls: ['./crypto-news.component.scss']
})
export class CryptoNewsComponent {
  cryptoNews: News[] = [];

  constructor(private newsService: DynamicNewsService) {}

  ngOnInit() {
    this.newsService.getDynamicNews('crypto OR cryptocurrency OR blockchain').then(articles => {
      this.cryptoNews = articles;
    });
  }

}
