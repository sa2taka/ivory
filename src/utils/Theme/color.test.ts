import { lighten, darken } from './color';

describe('Color', () => {
  test('lighten function is correct', () => {
    const color = '#123456';
    const lightenColor = lighten(color);
    const expected = '#2c4e70';
    expect(lightenColor).toBe(expected);
  });

  test('darken function is correct', () => {
    const color = '#123456';
    const lightenColor = darken(color);
    const expected = '#001a3c';
    expect(lightenColor).toBe(expected);
  });
});
