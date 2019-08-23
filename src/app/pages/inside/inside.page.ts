import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {
 
  data = '';
 
  constructor(private router:Router, private authService: AuthService, private storage: Storage, private toastController: ToastController) { }
 
  ngOnInit() {
  }
 
  loadSpecialInfo() {
    this.router.navigate(['home']);
  }
 
  logout() {
    this.authService.logout();
  }
 
  clearToken() {
    // ONLY FOR TESTING!
    this.storage.remove('access_token');
 
    let toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }
 
}