import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Student } from 'src/app/models/student';
import { StudentApiService } from 'src/app/service/student-api.service';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: []
})

export class StudentDetailsComponent implements OnInit{
  //Creates an instance Student class
  student: Student = new Student;

  constructor(private actRoute: ActivatedRoute, private apiService: StudentApiService)
  {
    //Gets roll number from url
    let roll = this.actRoute.snapshot.paramMap.get('roll');
    this.getStudentDetails(roll);
  }

  ngOnInit() {}

  //Gets Student Details & initialize values to the student object
  getStudentDetails(roll: any) {
    this.apiService.getStudent(roll)
      .subscribe((data) => {
        this.student = {
          roll: data.data['roll'],
          name: data.data['name'],
          dob: new Date(data.data['dob']),
          score: data.data['score'],
        }
    });
  }
}

// this.StudentDetails.roll = data.data['roll'];
// this.StudentDetails.name = data.data['name'];
// this.StudentDetails.dob = data.data['dob'];
// this.StudentDetails.score = data.data['score'];
