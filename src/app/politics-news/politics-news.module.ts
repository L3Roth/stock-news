import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PoliticsNewsComponent } from './politics-news.component';
import { DynamicNewsService } from '../services/dynamic-news.service';

const routes: Routes = [
  { path: '', component: PoliticsNewsComponent },
];

@NgModule({
  declarations: [PoliticsNewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [DynamicNewsService]
})
export class PoliticsNewsModule { }