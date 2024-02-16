import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Student } from 'src/app/models/student';
import { TeacherAPIService } from 'src/app/service/teacher-api.service';

//Declares variables & functions from script file
//Regex Validators
declare const numericsRegex: any;
declare const fullnameRegex: any;

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styles: []
})

export class EditStudentComponent implements OnInit {
  submitted: boolean = false;
  editStudentForm: FormGroup;

  constructor(
    public builder: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: TeacherAPIService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.updateStudent();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getStudentResults(id);
    this.editStudentForm = this.builder.group({
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
    return this.editStudentForm.controls;
  }


  getStudentResults(id) {
    this.apiService.getStudent(id)
    .subscribe((data) => {
      this.editStudentForm.setValue({
        roll: data.data['roll'],
        name: data.data['name'],
        dob: new Date(data.data['dob']).toISOString().split('T')[0],
        score: data.data['score'],
      });
    });
  }


  updateStudent() {
    this.editStudentForm = this.builder.group({
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


  onSubmit() {
    this.submitted = true;
    if (!this.editStudentForm.valid) {
      return false;
    }
    else{
      if (window.confirm('Are you sure to update this student\'s details?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateStudent(id, this.editStudentForm.value)
        .subscribe({
          complete: () => {
            this.toastr.info('Updated Successfully', 'Student Details');
            this.router.navigateByUrl('/listStudents');
          },
          error: (e) => {
            console.log("Failed to update student details: ", e);
          },
        });
      }
    }
  }
}
