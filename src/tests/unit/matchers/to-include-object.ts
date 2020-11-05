import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

export const toIncludeObject = (util: MatchersUtil): CustomMatcher => ({
  compare(actualArray = [], expectedObj = {}): CustomMatcherResult {
    const result: CustomMatcherResult = { pass: false, message: '' };

    result.pass = actualArray.some((item) => util.equals(item, expectedObj));

    if (result.pass) {
      result.message = `Expected ${actualArray} to contain ${expectedObj}.`;
    } else {
      result.message = `Expected ${actualArray} to contain ${expectedObj}, but it was not found.`;
    }
    return result;
  }
});
