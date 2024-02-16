import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TeacherLoginComponent } from './components/teacher/teacher-login/teacher-login.component';
import { AddStudentComponent } from './components/teacher/teacher-admin/add-student/add-student.component';
import { TeacherOptionsComponent } from './components/teacher/teacher-options/teacher-options.component';
import { StudentsListComponent } from './components/teacher/teacher-admin/students-list/students-list.component';
import { EditStudentComponent } from './components/teacher/teacher-admin/edit-student/edit-student.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { StudentDetailsComponent } from './components/student/student-details/student-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'teacherLogin', component: TeacherLoginComponent},
  { path: 'teacherOptions', component: TeacherOptionsComponent},
  { path: 'addStudent', component: AddStudentComponent},
  { path: 'listStudents', component: StudentsListComponent},
  { path: 'editStudent/:id', component: EditStudentComponent},
  { path: 'studentLogin', component: StudentLoginComponent},
  { path: 'readStudent/:roll', component: StudentDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
