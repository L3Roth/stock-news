import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

const apiKey = '1a497533ffbe4fac90710fb29655b2ee';
const apiUrl = 'https://newsapi.org/v2/everything';
@Component({
  selector: 'app-stock-news',
  templateUrl: './stock-news.component.html',
  styleUrls: ['./stock-news.component.scss']
})
export class StockNewsComponent {
  stockNews: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    axios.get(apiUrl, {
      params: {
        apiKey: apiKey,
        q: 'stocks OR stock market OR finance', // search query for stock news
        language: 'en', // language of news articles
        sortBy: 'publishedAt', // sort by most recent articles
        pageSize: 10 // number of articles to retrieve per request
      }
    })
    .then(response => {
      console.log(response.data.articles); // array of articles retrieved from the News API
      this.stockNews = response.data.articles;
    })
    .catch(error => {
      console.log(error);
    });
  }
}
