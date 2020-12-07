import { User } from 'app/auth';

export const userMock: User = {
  id: '1',
  fakeToken: 'token1',
  name: {
    first: 'first1',
    last: 'last1',
  },
  login: 'login1',
  password: 'password1',
};
