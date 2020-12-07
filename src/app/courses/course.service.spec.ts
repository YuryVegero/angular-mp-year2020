import { CourseService } from './course.service';
import { courses as coursesMock } from 'tests/unit/mocks/course.mock';
import { Course } from 'app/courses/course.model';

describe('CourseService', () => {
  /* let service: CourseService;

   beforeEach(() => {
     service = new CourseService();
     service['courses'] = mockCourses;
   });

   it('#getAll should return all courses', () => {
     expect(service.getAll()).toEqual(mockCourses);
   });

   describe('#delete', () => {
     it('should delete course by id', () => {
       const courses = service.getAll();
       const course = courses[1];

       expect(courses).toIncludeObject(course);
       service.delete(course.id);
       expect(service.getAll()).not.toIncludeObject(course);
     });

     it('should emit new courses', () => {
       const courses = service.getAll();

       service.coursesChanged.subscribe((newCourses: Course[]) => {
         expect(newCourses.length).toBeLessThan(courses.length);
       });
       service.delete(courses[1].id);
     });
   });*/
});
