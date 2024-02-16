import { Router } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherAPIService } from 'src/app/service/teacher-api.service';

//declares function name from script file
declare function showPassword(): void;

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styles: []
})

export class TeacherLoginComponent implements OnInit {
  //For referencing a local script file to Angular HTML Document
  // scriptFile: HTMLScriptElement;

  submitted = false;
  loginForm: FormGroup;


  constructor(
    public builder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: TeacherAPIService
  ){
    this.teacherLoginForm();

    //Adding local script file continues...
    // this.scriptFile = document.createElement("script");
    // this.scriptFile.src = "../../../../assets/js/script.js";
    // document.body.appendChild(this.scriptFile);
  }

  ngOnInit() {}

  //Show password when checkbox is checked
  makeVisible() {
    showPassword();
  }

  //Form validation
  teacherLoginForm(){
    this.loginForm = this.builder.group({
      password: ['', [Validators.required]]
    });
  }
  get authForm(){
    return this.loginForm.controls;
  }

  //Get Password - Validate using API
  authenticateTeacher(){
    var passInput = (<HTMLInputElement>document.getElementById('passTxt'));
    //Error element
    var errorMsg = (<HTMLDivElement>document.getElementById('invalidPass'));

    //Passes password input to apiSevice and return a response from API
    this.apiService.validatePassword(passInput.value)
      .subscribe((data) => {
        if(data['status']  == 200){
          this.ngZone.run(() => this.router.navigateByUrl('/teacherOptions'));
        }
        else{
          errorMsg.style.display = "block";
          passInput.addEventListener('change', () => {
            errorMsg.style.display = "none";
          });
        }
      });
    }

  onLogin() {
    this.submitted = true;
    if(!this.loginForm.valid){
      return false;
    }
    else{
     this.authenticateTeacher();
    }
  }
}
