import { Router } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { TeacherAPIService } from './../../../../service/teacher-api.service';

//Declares variables & functions from script file
//Regex Validators
declare const numericsRegex: any;
declare const fullnameRegex: any;

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: [],
})
export class AddStudentComponent implements OnInit {
  submitted: boolean = false;
  addStudentForm: FormGroup;

  constructor(
    public builder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private apiService: TeacherAPIService
  ) {
    this.studentForm();
  }

  ngOnInit() {}

  //Form Validation
  studentForm() {
    this.addStudentForm = this.builder.group({
      roll: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(numericsRegex),
        ],
      ],
      name: ['', [Validators.required, Validators.pattern(fullnameRegex)]],
      dob: ['', Validators.required],
      score: [
        '',
        [
          Validators.required,
          Validators.max(100),
          Validators.pattern(numericsRegex),
        ],
      ],
    });
  }
  // Getter to access form control
  get validateForm() {
    return this.addStudentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.addStudentForm.valid) {
      return false;
    } else {
      return this.apiService
      .addStudentScore(this.addStudentForm.value)
      .subscribe({
        complete: () => {
          this.toastr.success('Added Successfully', 'New Student Results');
          this.ngZone.run(() => this.router.navigateByUrl('/listStudents'));
        },
        error: (e) => {
          console.log('Failed to create student results: ', e);
        },
      });
    }
  }

onReset() {
  this.submitted = false;
  this.addStudentForm.reset();
  }
}
