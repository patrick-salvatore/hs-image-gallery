const add = (a, b) => {
  return a + b;
};

describe('test', () => {
  test('should add 2 number', () => {
    expect(add(5, 5)).toBe(10);
  });
});
