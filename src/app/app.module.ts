import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StockNewsComponent } from './stock-news/stock-news.component';
import { CryptoNewsComponent } from './crypto-news/crypto-news.component';
import { PoliticsNewsComponent } from './politics-news/politics-news.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StockNewsComponent,
    CryptoNewsComponent,
    PoliticsNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
