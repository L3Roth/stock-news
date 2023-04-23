import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CryptoNewsComponent } from './crypto-news.component';
import { DynamicNewsService } from '../services/dynamic-news.service';

const routes: Routes = [
  { path: '', component: CryptoNewsComponent },
];

@NgModule({
  declarations: [CryptoNewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [DynamicNewsService]
})
export class CryptoNewsModule { }