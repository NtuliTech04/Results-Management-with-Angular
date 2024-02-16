import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TeacherLoginComponent } from './components/teacher/teacher-login/teacher-login.component';
import { AddStudentComponent } from './components/teacher/teacher-admin/add-student/add-student.component';
import { TeacherOptionsComponent } from './components/teacher/teacher-options/teacher-options.component';
import { TeacherAPIService } from './service/teacher-api.service';
import { StudentsListComponent } from './components/teacher/teacher-admin/students-list/students-list.component';
import { EditStudentComponent } from './components/teacher/teacher-admin/edit-student/edit-student.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { StudentDetailsComponent } from './components/student/student-details/student-details.component';
import { StudentApiService } from './service/student-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeacherLoginComponent,
    AddStudentComponent,
    TeacherOptionsComponent,
    StudentsListComponent,
    EditStudentComponent,
    StudentLoginComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [TeacherAPIService, StudentApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
