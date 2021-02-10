import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public accountForm: FormGroup;
  public permissionForm: FormGroup;
  selectedFile: File = null;
  id_user:any;

  constructor(private formBuilder: FormBuilder,private userService: UserService,private route : Router) {
    this.createAccountForm();
    this.createPermissionForm();
  }

 
  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      firstName: new FormControl(  "" , Validators.required ),
      lastName: new FormControl( "" , Validators.required),
      email: new FormControl( ""  ,  Validators.required),
      password: new FormControl("",  Validators.required),
      phone: new FormControl(0,  Validators.required),
      civility: new FormControl( ""),
      post: new FormControl( ""  ),
      socialReason: new FormControl( "" ),
      Role: new FormControl(""),
  }
    )
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }

  adduser(): void {
   this.accountForm.value.Role="USER"   ;
   console.log(this.accountForm.value);
    this.userService.Adduser(this.accountForm.value).subscribe(
      user => {
          console.log(user)
          this.route.navigate(['/pages/login'])
      },
      error => {
        console.log("Erreur")
      }
  );
}

  ngOnInit() {
    this.userService.getuser().subscribe(res=>{
      console.log(res);
    })
  }

}
