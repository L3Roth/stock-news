import 'jasmine';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PoliticsNewsComponent } from "./politics-news.component";
import { DynamicNewsService } from "../services/dynamic-news.service";

describe('PoliticsNewsComponent', () => {
  let component: PoliticsNewsComponent;
  let fixture: ComponentFixture<PoliticsNewsComponent>;
  let newsService: jasmine.SpyObj<DynamicNewsService>;

  beforeEach(async () => {
    newsService = jasmine.createSpyObj('DynamicNewsService', ['getDynamicNews']);

    await TestBed.configureTestingModule({
      declarations: [ PoliticsNewsComponent ],
      providers: [
        { provide: DynamicNewsService, useValue: newsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticsNewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch politics news on initialization', () => {
    const dummyNews = [{
      title: 'dummy title',
      urlToImage: 'dummy/url/to/image',
      description: 'dummy description',
      url: 'dummy-url',
      publishedAt: '2021-01-02'
    }];
    newsService.getDynamicNews.and.returnValue(Promise.resolve(dummyNews));

    component.ngOnInit();

    expect(newsService.getDynamicNews).toHaveBeenCalledWith('politics OR senate OR election');
    fixture.whenStable().then(() => {
      expect(component.politicsNews).toEqual(dummyNews);
    });
  });

  it('should display an empty list of news when the service returns no data', () => {
    //Arrange
    const mockNewsService = jasmine.createSpyObj('DynamicNewsService', ['getDynamicNews']);
    mockNewsService.getDynamicNews.and.resolveTo([]);

    const component = new PoliticsNewsComponent(mockNewsService);

    //Act
    component.ngOnInit();

    //Assert
    expect(component.politicsNews).toEqual([]);
  });
});