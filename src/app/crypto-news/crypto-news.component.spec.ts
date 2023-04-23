import 'jasmine';
import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { CryptoNewsComponent } from './crypto-news.component';
import { DynamicNewsService } from '../services/dynamic-news.service';
import { of } from 'rxjs';
import { News } from '../interfaces/news-interface';

describe('CryptoNewsComponent', () => {
  let component: CryptoNewsComponent;
  let fixture: ComponentFixture<CryptoNewsComponent>;
  let newsService: jasmine.SpyObj<DynamicNewsService>;

  beforeEach(async () => {
    newsService = jasmine.createSpyObj('DynamicNewsService', ['getDynamicNews']);

    await TestBed.configureTestingModule({
      declarations: [ CryptoNewsComponent ],
      providers: [
        { provide: DynamicNewsService, useValue: newsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoNewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch crypto news on initialization', () => {
    const dummyNews = [{
      title: 'dummy title',
      urlToImage: 'dummy/url/to/image',
      description: 'dummy description',
      url: 'dummy-url',
      publishedAt: '2021-01-02'
    }];
    newsService.getDynamicNews.and.returnValue(Promise.resolve(dummyNews));

    component.ngOnInit();

    expect(newsService.getDynamicNews).toHaveBeenCalledWith('crypto OR cryptocurrency OR blockchain');
    fixture.whenStable().then(() => {
      expect(component.cryptoNews).toEqual(dummyNews);
    });
  });

  it('should display an empty list of news when the service returns no data', () => {
    // Arrange
    const mockNewsService = jasmine.createSpyObj('DynamicNewsService', ['getDynamicNews']);
    mockNewsService.getDynamicNews.and.resolveTo([]);
  
    const component = new CryptoNewsComponent(mockNewsService);
  
    // Act
    component.ngOnInit();
  
    // Assert
    expect(component.cryptoNews).toEqual([]);
  });

  /*it('should display error message if news service returns error', fakeAsync(() => {
    const errorMsg = 'Sorry, there was an error retrieving the news. Please try again later.';
    newsService.getDynamicNews.and.returnValue(Promise.reject(errorMsg));
  
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  
    const errorEl = fixture.nativeElement.querySelector('.error');
    expect(errorEl).not.toBeNull();
    expect(errorEl.textContent).toContain(errorMsg);
  }));
  
  it('should display news if news service returns data', fakeAsync(() => {
    const news = [
      { title: 'News 1', description: 'Description 1', urlToImage: 'image1.jpg', url: 'http://example.com/news1' },
      { title: 'News 2', description: 'Description 2', urlToImage: 'image2.jpg', url: 'http://example.com/news2' },
    ];
    newsService.getDynamicNews.and.returnValue(Promise.resolve(news));
  
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  
    const newsEls = fixture.nativeElement.querySelectorAll('.pb-4');
    expect(newsEls.length).toBe(2);
    expect(newsEls[0].querySelector('h2').textContent).toBe(news[0].title);
    expect(newsEls[1].querySelector('h2').textContent).toBe(news[1].title);
  }));*/

  /*it('should set cryptoNews to null on error', async () => {
    const errorMsg = 'Sorry, there was an error retrieving the news. Please try again later.';
    newsService.getDynamicNews.and.returnValue(Promise.reject(errorMsg));
  
    await component.ngOnInit();
  
    expect(component.cryptoNews).toBeNull();
  });

  it('should display error message if news service returns an error', () => {
    const errorMsg = 'Error fetching news';
    newsService.getDynamicNews.and.returnValue(Promise.reject(errorMsg));
  
    component.ngOnInit();
  
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errorEl = fixture.nativeElement.querySelector('.error');
      expect(errorEl).not.toBeNull();
      expect(errorEl.textContent).toContain(errorMsg);
    });
  });

  it('should display message if no news found', () => {
    const emptyNews: News[] = [];
    newsService.getDynamicNews.and.returnValue(Promise.resolve(emptyNews));
  
    component.ngOnInit();
  
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const messageEl = fixture.nativeElement.querySelector('.message');
      expect(messageEl).not.toBeNull();
      expect(messageEl.textContent).toContain('No news found.');
    });
  });

  it('should display the latest news first', () => {
    const news: News[] = [
      {
        title: 'News A',
        urlToImage: 'dummy/url/to/image',
        description: 'dummy description',
        url: 'dummy-url',
        publishedAt: '2021-01-01'
      },
      {
        title: 'News B',
        urlToImage: 'dummy/url/to/image',
        description: 'dummy description',
        url: 'dummy-url',
        publishedAt: '2021-01-02'
      },
      {
        title: 'News C',
        urlToImage: 'dummy/url/to/image',
        description: 'dummy description',
        url: 'dummy-url',
        publishedAt: '2021-01-03'
      },
    ];
    const dummyNews = [{
      title: 'dummy title',
      urlToImage: 'dummy/url/to/image',
      description: 'dummy description',
      url: 'dummy-url',
    }];
    newsService.getDynamicNews.and.returnValue(Promise.resolve(news));
  
    component.ngOnInit();
  
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const newsEls = fixture.nativeElement.querySelectorAll('.news');
      console.log('NEWS ELEMENT?: ', newsEls);
      expect(newsEls.length).toEqual(3);
      expect(newsEls[0].textContent).toContain('News C');
      expect(newsEls[1].textContent).toContain('News B');
      expect(newsEls[2].textContent).toContain('News A');
    });
  });

  it('should display the correct news articles', () => {
    const news: News[] = [
      {
        title: 'News A',
        urlToImage: 'dummy/url/to/image',
        description: 'dummy description',
        url: 'dummy-url',
        publishedAt: '2021-01-01'
      },
      {
        title: 'News B',
        urlToImage: 'dummy/url/to/image',
        description: 'dummy description',
        url: 'dummy-url',
        publishedAt: '2021-01-02'
      },
    ];
    newsService.getDynamicNews.and.returnValue(Promise.resolve(news));
  
    component.ngOnInit();
  
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const newsEls = fixture.nativeElement.querySelectorAll('.news');
      expect(newsEls.length).toEqual(2);
      expect(newsEls[0].querySelector('.news-title').textContent).toContain('News A');
      expect(newsEls[0].querySelector('.news-description').textContent).toContain('Description A');
      expect(newsEls[1].querySelector('.news-title').textContent).toContain('News B');
      expect(newsEls[1].querySelector('.news-description').textContent).toContain('Description B');
    });
  });

  it('should display a limited number of news articles', () => {
    const news: News[] = [
      {
        title: 'News A',
        urlToImage: 'dummy/url/to/image',
        description: 'dummy description',
        url: 'dummy-url',
        publishedAt: '2021-01-01'
      },
      {
        title: 'News B',
        urlToImage: 'dummy/url/to/image',
        description: 'dummy description',
        url: 'dummy-url',
        publishedAt: '2021-01-02'
      },
      {
        title: 'News C',
        urlToImage: 'dummy/url/to/image',
        description: 'dummy description',
        url: 'dummy-url',
        publishedAt: '2021-01-03'
      },
      {
        title: 'News D',
        urlToImage: 'dummy/url/to/image',
        description: 'dummy description',
        url: 'dummy-url',
        publishedAt: '2021-01-04'
      },
      {
        title: 'News E',
        urlToImage: 'dummy/url/to/image',
        description: 'dummy description',
        url: 'dummy-url',
        publishedAt: '2021-01-05'
      },
    ];
    const limit = 3;
    newsService.getDynamicNews.and.returnValue(Promise.resolve(news));
  
    component.pageSize = limit;
    component.ngOnInit();
  
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const newsEls = fixture.nativeElement.querySelectorAll('.news');
      expect(newsEls.length).toEqual(limit);
      expect(newsEls[0].querySelector('.news-title').textContent).toContain('News E');
      expect(newsEls[1].querySelector('.news-title').textContent).toContain('News D');
      expect(newsEls[2].querySelector('.news-title').textContent).toContain('News C');
    });
  });*/
  
});

