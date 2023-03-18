import { Injectable } from '@angular/core';
import axios from 'axios';

import { News } from '../interfaces/news-interface';

@Injectable({
  providedIn: 'root'
})
export class DynamicNewsService {

  private readonly API_KEY = '1a497533ffbe4fac90710fb29655b2ee';
  private readonly API_URL = 'https://newsapi.org/v2/everything';

  dynamicNews: News[] = [];

  constructor() { }

  getDynamicNews(newskeywords: string) {
    return axios.get(this.API_URL, {
      params: {
        apiKey: this.API_KEY,
        q: newskeywords,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10
      }
  })
    .then(response => this.dynamicNews = response.data.articles)
    .catch(error => {
      console.error('error fetching top headlines: ', error);
      throw error;
    })
  }
}
