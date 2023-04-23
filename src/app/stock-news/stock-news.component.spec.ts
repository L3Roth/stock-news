import { TestBed, ComponentFixture } from "@angular/core/testing";
import { StockNewsComponent } from "./stock-news.component";
import { DynamicNewsService } from "../services/dynamic-news.service";

describe('StockNewsComponent', () => {
  let component: StockNewsComponent;
  let fixture: ComponentFixture<StockNewsComponent>;
  let newsService: jasmine.SpyObj<DynamicNewsService>;

  beforeEach(async () => {
    newsService = jasmine.createSpyObj('DynamicNewsService', ['getDynamicNews']);

    await TestBed.configureTestingModule({
      declarations: [StockNewsComponent],
      providers: [
        { provide: DynamicNewsService, useValue: newsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch stock news on initialization', () => {
    const dummyNews = [{
      title: 'dummy title',
      urlToImage: 'dummy/url/to/image',
      description: 'dummy description',
      url: 'dummy-url',
      publishedAt: '2021-01-02'
    }];
    newsService.getDynamicNews.and.returnValue(Promise.resolve(dummyNews));

    component.ngOnInit();

    expect(newsService.getDynamicNews).toHaveBeenCalledWith('stocks OR stock market OR finance');
    fixture.whenStable().then(() => {
      expect(component.stockNews).toEqual(dummyNews);
    });
  });

  it('should display an empty list of news when the service returns no data', () => {
    //Arrange
    const mockNewsService = jasmine.createSpyObj('DynamicNewsService', ['getDynamicNews']);
    mockNewsService.getDynamicNews.and.resolveTo([]);

    const component = new StockNewsComponent(mockNewsService);

    //Act
    component.ngOnInit();

    //Assert
    expect(component.stockNews).toEqual([]);
  });
});