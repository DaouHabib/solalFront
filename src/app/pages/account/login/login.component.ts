import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder ,  private authService: AuthenticationService,
    private router: Router,
    private userService: UserService) {
    this.createLoginForm();
    this.createRegisterForm();
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
  });
    
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
        (data) => {
            console.log(data);
            if (data){
            this.authService.saveToken(data.token)
                this.router.navigate( ['pages/dashboard'] );
              }
            
        },
        (error) => {
        }
    );
}
  owlcarousel = [
    {
      title: "Welcome to Solal Application",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Solal Application",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Solal Application",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    }
  ]
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      confirmPassword: [''],
    })
  }


  ngOnInit() {
  }

  onSubmit() {
    
  }

}
