import { describe, it, expect } from 'vitest';
import { calcBalance } from './calcBalance';

describe('calcBalance', () => {
  it('正常系: 残高が正しく計算される', () => {
    expect(calcBalance(10000, 3000)).toBe(7000);
  });

  it('異常系: 負の値が渡された場合', () => {
    expect(calcBalance(-5000, 1000)).toBe(-6000);
  });
});
