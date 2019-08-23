import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  credentialsForm: FormGroup;
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private message:ToastService) { }
 
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      UserName: ['', [Validators.required]],
      UserPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onSubmit() {
    console.log(this.credentialsForm.value);
    this.authService.login(this.credentialsForm.value).subscribe();
  }
 
  register() {
    this.authService.register(this.credentialsForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      this.authService.login(this.credentialsForm.value).subscribe();
    });
  }
 
}