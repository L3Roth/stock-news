import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

const apiKey = '1a497533ffbe4fac90710fb29655b2ee';
const apiUrl = 'https://newsapi.org/v2/everything';

@Component({
  selector: 'app-crypto-news',
  templateUrl: './crypto-news.component.html',
  styleUrls: ['./crypto-news.component.scss']
})
export class CryptoNewsComponent {
  cryptoNews: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    axios.get(apiUrl, {
      params: {
        apiKey: apiKey,
        q: 'crypto OR cryptocurrency OR blockchain',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10
      }
    })
    .then(response => {
      console.log(response.data.articles);
      this.cryptoNews = response.data.articles;
    })
    .catch(error => {
      console.log(error);
    });
  }

}
