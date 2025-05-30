import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
export interface course {
  title: string;
  author: string;
  description: string;
  topics: string[];
  rating: number;
  showTopics: boolean;
  enrolled: boolean;
}
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  searchTerm = '';
  sortOrder = 'desc';
  courses: course[] = [];
  filteredCourses: course[] = [];
  enrolledCount: number = 0;

  constructor(private _sharedService: SharedService) {}

  ngOnInit(): void {
    //get the data from api and assign it to local variables
    this._sharedService.getCourses().subscribe(
      (response) => {
        this.courses = response;
        this.filteredCourses = JSON.parse(JSON.stringify(this.courses));
        this.sort();
      },
      (error) => {
        console.error('Courses load failed', error);
      }
    );
  }
  //Show/hide course contents as per button click
  toggleTopics(course: any): void {
    course.showTopics = !course.showTopics;
  }
  //Sort the courses by rating 
  public sort():void{
    this.filteredCourses.sort((a, b) =>
      this.sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
    );
  }
  //Filter the courses by author or title
  public filterCourses(): void {
    this.filteredCourses = this.courses.filter(
      (course) =>
        course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.sort();
  }
  //View all courses or only enrolled courses as per selection
  public viewCourses(type): void {
    this.searchTerm = '';
    if (type === 'All') {
      this.filteredCourses = JSON.parse(JSON.stringify(this.courses));
    } else {
      this.filteredCourses = this.courses.filter(
        (course) => course.enrolled === true
      );
    }
  }
  //Enroll/Withdraw user from the course
  enroll(selectedCourse: any): void {
    //Update the state for each course
    this.courses = this.courses.map((course) =>
      course.author === selectedCourse.author &&
      course.title === selectedCourse.title
        ? { ...course, enrolled: !course.enrolled }
        : course
    );
    this.filteredCourses = this.filteredCourses.map((course) =>
      course.author === selectedCourse.author &&
      course.title === selectedCourse.title
        ? { ...course, enrolled: !course.enrolled }
        : course
    );
    const course = this.filteredCourses.find(
      (course) =>
        course.author === course.author && course.title === course.title
    );
    if (course.enrolled) {
      alert(`You enrolled in: ${selectedCourse.title}`);
    } else {
      alert(`You have withdrawn from course: ${selectedCourse.title}`);
    }
    //Update the enrolled courses count
    const enrolledCourses = this.courses.filter(
      (course) => course.enrolled === true
    );
    this.enrolledCount = enrolledCourses.length;
  }
}
