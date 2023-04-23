import 'jasmine';
import { TestBed } from '@angular/core/testing';
import { DynamicNewsService } from './dynamic-news.service';
import axios from 'axios';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from '../interfaces/news-interface';

describe('DynamicNewsService', () => {
  let service: DynamicNewsService;

  const mockNews: News[] = [
    {
      title: 'News Title 1',
      description: 'News Description 1',
      url: 'https://www.example.com/news1',
      urlToImage: 'https://www.example.com/news1/image.jpg',
      publishedAt: '2022-05-01T12:00:00Z'
    },
    {
      title: 'News Title 2',
      description: 'News Description 2',
      url: 'https://www.example.com/news2',
      urlToImage: 'https://www.example.com/news2/image.jpg',
      publishedAt: '2022-05-02T12:00:00Z'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return news articles', (done) => {
    service.getDynamicNews('crypto').then(articles => {
      expect(articles).toBeDefined();
      expect(articles.length).toBeGreaterThan(0);
      expect(articles[0].title).toBeDefined();
      expect(articles[1].urlToImage).toBeDefined();
      expect(articles[2].description).toBeDefined();
      expect(articles[3].url).toBeDefined();
      expect(articles[4].publishedAt).toBeDefined();
      done();
    }).catch(error => {
      done.fail(error);
    });
  });

  it('should throw an error when news retrieval fails', (done) => {
    spyOn(axios, 'get').and.returnValue(Promise.reject('error'));
    service.getDynamicNews('crypto').then(articles => {
      done.fail('Expected getDynamicNews to throw an error');
    }).catch(error => {
      expect(error).toBeDefined();
      done();
    });
  });

  it('should update news articles', (done) => {
    spyOn(axios, 'get').and.returnValue(Promise.resolve({data: {articles: [{title: 'New article'}]}}));
    service.getDynamicNews('crypto').then(() => {
      expect(service.dynamicNews).toBeDefined();
      expect(service.dynamicNews.length).toBe(1);
      expect(service.dynamicNews[0].title).toBe('New article');
      done();
    }).catch(error => {
      done.fail(error);
    });
  });

  it('should return news articles when search keyword is provided', () => {
    //Arrange
    const keyword = 'example';
    const axiosSpy = spyOn(axios, 'get').and.returnValue(
      Promise.resolve({ data: { articles: mockNews } })
    );

    //Act
    const news$ = service.searchNews(keyword);

    //Assert
    expect(news$).toBeTruthy();
    expect(axiosSpy).toHaveBeenCalledWith(service.getApiUrl(), {
      params: {
        apiKey: service.getApiKey(),
        q: keyword,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10
      }
    });

    news$.subscribe(news => {
      expect(news.length).toBe(2);
      expect(news).toEqual(mockNews);
    });
  });

  it('should return empty array when search keyword is empty', () => {
    const keyword = '';
    const expectedNews: News[] = [];
    
    service.searchNews(keyword).subscribe(news => {
      expect(news).toEqual(expectedNews);
    });
  });

  it('should handle errors during search', () => {
    //Arrange
    const keyword = 'example';
    const errorMessage = 'Error occurred';
    const axiosSpy = spyOn(axios, 'get').and.returnValue(
      Promise.reject(errorMessage)
    );

    //Act
    const news$ = service.searchNews(keyword);

    //Assert
    expect(news$).toBeTruthy();
    expect(axiosSpy).toHaveBeenCalledWith(service.getApiUrl(), {
      params: {
        apiKey: service.getApiKey(),
        q: keyword,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10
      }
    });

    news$.subscribe(
      () => {},
      error => {
        expect(error).toBe(errorMessage);
      }
    );
  });
    
});
