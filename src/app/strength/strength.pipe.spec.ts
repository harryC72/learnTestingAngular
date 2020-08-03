import { StrengthPipe } from './strength.pipe';
describe('Strength pipe', () => {
  it('should should display weak if the strength is 5', () => {
    const pipe = new StrengthPipe();

    const val = pipe.transform(5);

    expect(val).toEqual('5 (weak)');
  });

  it('should should display strong if the strength is 10', () => {
    const pipe = new StrengthPipe();

    const val = pipe.transform(10);

    expect(val).toEqual('10 (strong)');
  });
});
