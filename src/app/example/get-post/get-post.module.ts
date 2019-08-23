import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GetPostPage } from './get-post.page';
import { HttpClientModule } from '@angular/common/http'; 
import { GetpostService } from 'src/app/services/getpost.service';
const routes: Routes = [
  {
    path: '',
    component: GetPostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GetPostPage],
  providers: [GetpostService]
})
export class GetPostPageModule {}
