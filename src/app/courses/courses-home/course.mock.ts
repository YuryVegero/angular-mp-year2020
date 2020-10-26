import { Course } from 'app/courses/course.model';

export const courses: Course[] = [
  new Course({
    createdAt: new Date(2018, 10, 24),
    id: '1',
    title: 'Angular',
    duration: 88,
    description: 'Master Angular and build awesome, reactive web apps.',
  }),
  new Course({
    createdAt: new Date(),
    id: '2',
    title: 'React',
    duration: 70,
    description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
  }),
  new Course({
    createdAt: new Date(),
    id: '3',
    title: 'Vue',
    duration: 75,
    description: 'Vue.js is an awesome JavaScript Framework for building Frontend Applications! VueJS mixes the Best of Angular + React!',
  }),
  new Course({
    createdAt: new Date(),
    id: '4',
    title: 'Typescript',
    duration: 40,
    description: 'Don\'t limit the Usage of TypeScript to Angular! Learn the Basics, its Features, Workflows and how to use it!',
  }),
  new Course({
    createdAt: new Date(),
    id: '5',
    title: 'Webpack',
    duration: 65,
    description: 'Master Webpack as you deploy web apps supported by Babel, code splitting, and ES2015 Modules.',
  }),
];
