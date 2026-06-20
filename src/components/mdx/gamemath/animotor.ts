export type Vec2 = { x: number; y: number };

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

export function easeInOut(t: number): number {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export function rotate2(v: Vec2, radians: number): Vec2 {
  const c = Math.cos(radians);
  const s = Math.sin(radians);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c };
}

export function scale2(v: Vec2, sx: number, sy: number): Vec2 {
  return { x: v.x * sx, y: v.y * sy };
}

export function add2(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

