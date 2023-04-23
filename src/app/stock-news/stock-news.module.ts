import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StockNewsComponent } from './stock-news.component';
import { DynamicNewsService } from '../services/dynamic-news.service';

const routes: Routes = [
  { path: '', component: StockNewsComponent },
];

@NgModule({
  declarations: [StockNewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [DynamicNewsService]
})
export class StockNewsModule { }