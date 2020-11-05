// tslint:disable-next-line:no-namespace
declare namespace jasmine {
  interface Matchers<T> {
    toIncludeObject(expected: any, expectationFailOutput?: any): boolean;
  }
}
