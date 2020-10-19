import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('transforms "77" to "1h 17min"', () => {
    expect(pipe.transform(77)).toBe('1h 17min');
  });

  it('transforms "45" to "45min"', () => {
    expect(pipe.transform(45)).toBe('45min');
  });

  it('transforms "0" to "0min"', () => {
    expect(pipe.transform(0)).toBe('0min');
  });
});
