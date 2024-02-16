import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TeacherAPIService } from 'src/app/service/teacher-api.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: []
})

export class StudentLoginComponent implements OnInit{
  submitted = false;
  loginForm: FormGroup;
  Students: any = [];

  constructor(
    public builder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private apiService: TeacherAPIService)
    {
      this.studentLoginForm();
      this.readAllStudents();
    }


  ngOnInit() {}

    //Form validation
    studentLoginForm(){
      this.loginForm = this.builder.group({
        roll: ['', [Validators.required]],
        dob: ['', Validators.required]
      });
      }
      get validateForm(){
      return this.loginForm.controls;
    }


  //Temporary stores student Data in "Students"
  readAllStudents(){
    this.apiService.getResults()
    .subscribe((data) => {
      this.Students = data;
    })
  }

  authenticateStudent(){
    //Get student credentials input
    var rollNo = (<HTMLInputElement>document.getElementById('roll'));
    var birthDate = (<HTMLInputElement>document.getElementById('dob'));

    //Error element
    var errorMsg = (<HTMLInputElement>document.getElementById('invalidStudent'));

    //Loops across all students to check for existance
    for (const student of this.Students) {
      //Get 'roll' & 'dob' from "student" iterator
      let roll = student.roll;
      let dob = new Date(student.dob).toISOString().split('T')[0];

      if(rollNo.value.trim() == roll && birthDate.value == dob){
        this.Students.splice(0); //Clear 'Students' array
        this.ngZone.run(() => this.router.navigateByUrl(`/readStudent/${rollNo.value}`));
        break;
      }
    }
    //If we get here display invalid login attempt message
      errorMsg.style.display = "block";
      addEventListener('change', () => {
      errorMsg.style.display = "none";
    });
  }


  onLogin() {
    this.submitted = true;
    //Returns form validation messages
    if(!this.loginForm.valid){
      return false;
    }
    else{
    //Validates &/|| authenticate student
      this.authenticateStudent();
    }
  }

onReset() {
  this.submitted = false;
  this.loginForm.reset();
  }
}






