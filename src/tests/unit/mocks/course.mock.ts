import { Course } from 'app/courses/course.model';

export const courses: Course[] = [
  new Course({
    date: '2018-05-22',
    id: '1',
    name: 'Angular',
    length: 88,
    description: 'Master Angular and build awesome, reactive web apps.',
    authors: [],
    isTopRated: false,
  }),
  new Course({
    date: '2021-04-24',
    id: '2',
    name: 'React',
    length: 70,
    description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
    authors: [],
    isTopRated: true,
  }),
  new Course({
    date: '2020-09-26',
    id: '3',
    name: 'Vue',
    length: 75,
    description: 'Vue.js is an awesome JavaScript Framework for building Frontend Applications! VueJS mixes the Best of Angular + React!',
    authors: [],
    isTopRated: false,
  }),
  new Course({
    date: '2020-09-27',
    id: '4',
    name: 'Typescript',
    length: 40,
    description: 'Don\'t limit the Usage of TypeScript to Angular! Learn the Basics, its Features, Workflows and how to use it!',
    authors: [],
    isTopRated: true,
  }),
  new Course({
    date: '2019-07-21',
    id: '5',
    name: 'Webpack',
    length: 65,
    description: 'Master Webpack as you deploy web apps supported by Babel, code splitting, and ES2015 Modules.',
    authors: [],
    isTopRated: false,
  }),
];
