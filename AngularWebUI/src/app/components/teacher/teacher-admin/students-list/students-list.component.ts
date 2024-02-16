import { ToastrService } from 'ngx-toastr';
import { Component, NgZone, OnInit } from '@angular/core';
import { TeacherAPIService } from './../../../../service/teacher-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: []
})

export class StudentsListComponent implements OnInit {
  Students: any = [];

  constructor(
    private apiService: TeacherAPIService,
    private toastr: ToastrService,
    private router: Router,
    private ngZone: NgZone,
  )
  {
    this.readResults();
  }

  ngOnInit() {}

  //Uses API service to read all students records
  readResults(){
    this.apiService.getResults()
    .subscribe((data) => {
      this.Students = data;
    })
  }


  //Uses API service to delete student details from students records
  removeStudent(student, index) {
    if(window.confirm('Are you sure to delete this student\'s details?')) {
      this.apiService.deleteStudent(student._id)
      .subscribe({
        complete: () => {
          this.Students.splice(index, 1)
          this.toastr.warning('Deleted Successfully', 'Student Details')
          this.ngZone.run(() => this.router.navigateByUrl('/listStudents'))
        },
        error: (e) => {
          console.log("Failed to delete student details: ", e);
        },
      });
    }
  }
}
