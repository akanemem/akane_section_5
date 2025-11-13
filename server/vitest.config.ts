import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',   // ← バックエンドなので node 環境
    include: ['src/**/*.test.ts'], // ← テストファイルを src 配下に限定
  }
});
