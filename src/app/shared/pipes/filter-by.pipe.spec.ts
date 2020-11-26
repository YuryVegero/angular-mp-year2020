import { FilterByPipe } from './filter-by.pipe';
import { courses } from 'tests/unit/mocks/course.mock';

describe('FilterByPipe', () => {
  const pipe = new FilterByPipe();
  const findCourse = (courseName) => courses.find(({ name }) => name === courseName);

  it('should return empty array if no items provided', () => {
    expect(pipe.transform(null, '', '')).toEqual([]);
  });

  it('should return empty array for non existing field', () => {
    expect(pipe.transform(courses, 'abc', 'term')).toEqual([]);
  });

  it('should return provided items for empty search term', () => {
    expect(pipe.transform(courses, '', '')).toEqual(courses);
  });

  it('should return one item for "react" search term', () => {
    const resultArr = pipe.transform(courses, 'name', 'react');
    const reactCourse = findCourse('React');
    expect(resultArr).toEqual([ reactCourse ]);
  });

  it('should return "Angular" and "Vue" courses for "u" search term', () => {
    const resultArr = pipe.transform(courses, 'name', 'u');
    const angularCourse = findCourse('Angular');
    const vueCourse = findCourse('Vue');

    expect(resultArr.length).toBe(2);
    expect(resultArr).toContain(angularCourse);
    expect(resultArr).toContain(vueCourse);
  });
});
