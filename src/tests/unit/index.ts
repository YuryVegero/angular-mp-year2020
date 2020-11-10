// tslint:disable-next-line:no-reference
/// <reference path="./matchers/to-include-object.d.ts"/>

export * from './utils';
import { toIncludeObject } from './matchers';

jasmine.getEnv().beforeAll(() => {
  jasmine.addMatchers({
    toIncludeObject,
  });
});
