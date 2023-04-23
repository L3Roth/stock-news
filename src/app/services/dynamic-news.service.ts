import { Injectable } from '@angular/core';
import axios from 'axios';
import { News } from '../interfaces/news-interface';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DynamicNewsService {

  private readonly API_KEY: string = environment.apiKey;
  private readonly API_URL: string = environment.apiUrl;

  dynamicNews: News[] = [];

  constructor() {
  }

  getDynamicNews(newskeywords: string) {
    return axios.get(this.getApiUrl(), {
      params: {
        apiKey: this.getApiKey(),
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

  searchNews(keyword: string): Observable<News[]> {
    return from(axios.get(this.getApiUrl(), {
      params: {
        apiKey: this.getApiKey(),
        q: keyword,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10
      }
    })).pipe(
      map(response => response.data.articles as News[])
    );
  }

  getApiUrl(): string {
    return this.API_URL;
  }

  getApiKey(): string {
    return this.API_KEY;
  }
  
}
