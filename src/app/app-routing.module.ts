import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CryptoNewsComponent } from './crypto-news/crypto-news.component';
import { PoliticsNewsComponent } from './politics-news/politics-news.component';
import { StockNewsComponent } from './stock-news/stock-news.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'stock-news', component: StockNewsComponent },
  { path: 'crypto-news', component: CryptoNewsComponent },
  { path: 'politics-news', component: PoliticsNewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
