import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'stock-news', loadChildren: () => import('./stock-news/stock-news.module').then(m => m.StockNewsModule) },
  { path: 'crypto-news', loadChildren: () => import('./crypto-news/crypto-news.module').then(m => m.CryptoNewsModule) },
  { path: 'politics-news', loadChildren: () => import('./politics-news/politics-news.module').then(m => m.PoliticsNewsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
