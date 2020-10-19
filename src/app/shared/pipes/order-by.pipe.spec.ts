import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();

  it('should return empty array if no items provided', () => {
    expect(pipe.transform(null, '')).toEqual([]);
  });

  it('should order string items by desc', () => {
    const items = [
      { name: 'orange' },
      { name: 'apple' },
      { name: 'grape' },
    ];
    const expected = [
      { name: 'orange' },
      { name: 'grape' },
      { name: 'apple' },
    ];
    expect(pipe.transform(items, 'name')).toEqual(expected);
  });

  it('should order Date items by desc', () => {
    const items = [
      { date: new Date(2020, 9, 10) },
      { date: new Date(2020, 7, 10) },
      { date: new Date(2020, 8, 10) },
    ];
    const expected = [
      { date: new Date(2020, 9, 10) },
      { date: new Date(2020, 8, 10) },
      { date: new Date(2020, 7, 10) },
    ];
    expect(pipe.transform(items, 'date')).toEqual(expected);
  });
});
