/**
 * @title 랜덤으로 키 생성 (map api 사용시 자주 사용)
 */
export function getRandomKey(): string {
  return Math.random().toString(36).substring(2);
}
