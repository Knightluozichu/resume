/**
 * 列主序 4×4 矩阵小工具（摄像机 Demo 专用，不引 gl-matrix）。
 * 与 GLSL / WebGL 约定一致：列主序、右乘列向量。
 */

export type Mat4 = Float32Array;
export type Vec3 = readonly [number, number, number];

export function mat4Create(): Mat4 {
  const m = new Float32Array(16);
  m[0] = m[5] = m[10] = m[15] = 1;
  return m;
}

export function mat4Multiply(out: Mat4, a: Mat4, b: Mat4): Mat4 {
  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a03 = a[3];
  const a10 = a[4];
  const a11 = a[5];
  const a12 = a[6];
  const a13 = a[7];
  const a20 = a[8];
  const a21 = a[9];
  const a22 = a[10];
  const a23 = a[11];
  const a30 = a[12];
  const a31 = a[13];
  const a32 = a[14];
  const a33 = a[15];

  let b0 = b[0];
  let b1 = b[1];
  let b2 = b[2];
  let b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}

export function mat4Perspective(
  out: Mat4,
  fovyRad: number,
  aspect: number,
  near: number,
  far: number,
): Mat4 {
  const f = 1 / Math.tan(fovyRad / 2);
  out.fill(0);
  out[0] = f / aspect;
  out[5] = f;
  out[10] = (far + near) / (near - far);
  out[11] = -1;
  out[14] = (2 * far * near) / (near - far);
  return out;
}

export function mat4LookAt(out: Mat4, eye: Vec3, center: Vec3, up: Vec3): Mat4 {
  let zx = eye[0] - center[0];
  let zy = eye[1] - center[1];
  let zz = eye[2] - center[2];
  let len = Math.hypot(zx, zy, zz);
  if (len === 0) {
    zz = 1;
    len = 1;
  }
  zx /= len;
  zy /= len;
  zz /= len;

  let xx = up[1] * zz - up[2] * zy;
  let xy = up[2] * zx - up[0] * zz;
  let xz = up[0] * zy - up[1] * zx;
  len = Math.hypot(xx, xy, xz);
  if (len === 0) {
    xx = 1;
    len = 1;
  }
  xx /= len;
  xy /= len;
  xz /= len;

  const yx = zy * xz - zz * xy;
  const yy = zz * xx - zx * xz;
  const yz = zx * xy - zy * xx;

  out[0] = xx;
  out[1] = yx;
  out[2] = zx;
  out[3] = 0;
  out[4] = xy;
  out[5] = yy;
  out[6] = zy;
  out[7] = 0;
  out[8] = xz;
  out[9] = yz;
  out[10] = zz;
  out[11] = 0;
  out[12] = -(xx * eye[0] + xy * eye[1] + xz * eye[2]);
  out[13] = -(yx * eye[0] + yy * eye[1] + yz * eye[2]);
  out[14] = -(zx * eye[0] + zy * eye[1] + zz * eye[2]);
  out[15] = 1;
  return out;
}

export function mat4Translate(
  out: Mat4,
  x: number,
  y: number,
  z: number,
): Mat4 {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = x;
  out[13] = y;
  out[14] = z;
  out[15] = 1;
  return out;
}

export function mat4Scale(out: Mat4, sx: number, sy: number, sz: number): Mat4 {
  out.fill(0);
  out[0] = sx;
  out[5] = sy;
  out[10] = sz;
  out[15] = 1;
  return out;
}

/** 由 pitch/yaw（度）和距离，计算看向原点的摄像机位置。 */
export function cameraEyeFromAngles(
  pitchDeg: number,
  yawDeg: number,
  distance: number,
): Vec3 {
  const pitch = (pitchDeg * Math.PI) / 180;
  const yaw = (yawDeg * Math.PI) / 180;
  const fx = Math.cos(pitch) * Math.cos(yaw);
  const fy = Math.sin(pitch);
  const fz = Math.cos(pitch) * Math.sin(yaw);
  return [-fx * distance, -fy * distance, -fz * distance];
}

/** 与 LearnOpenGL 一致的 front 方向向量（未归一化时已是单位向量）。 */
export function frontFromAngles(pitchDeg: number, yawDeg: number): Vec3 {
  const pitch = (pitchDeg * Math.PI) / 180;
  const yaw = (yawDeg * Math.PI) / 180;
  return [
    Math.cos(pitch) * Math.cos(yaw),
    Math.sin(pitch),
    Math.cos(pitch) * Math.sin(yaw),
  ];
}

/** 单位立方体 36 顶点（position-only，每面 2 三角，flat color；中心原点、边长 1） */
export const CUBE_VERTICES = new Float32Array([
  // 后面 (-z)
  -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5,
  -0.5, -0.5, 0.5, -0.5,
  // 前面 (+z)
  -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
  -0.5, -0.5, 0.5,
  // 左面 (-x)
  -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
  -0.5, 0.5, -0.5, 0.5, 0.5,
  // 右面 (+x)
  0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5,
  0.5, 0.5, -0.5, 0.5,
  // 下面 (-y)
  -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5,
  0.5, -0.5, -0.5, -0.5,
  // 上面 (+y)
  -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5,
  -0.5, -0.5, 0.5, 0.5,
]);

/** XZ 平面网格线顶点（lines） */
export function buildGridLines(half = 8, step = 1): Float32Array {
  const verts: number[] = [];
  for (let i = -half; i <= half; i += step) {
    verts.push(-half, 0, i, half, 0, i);
    verts.push(i, 0, -half, i, 0, half);
  }
  return new Float32Array(verts);
}

export type SceneCube = {
  position: Vec3;
  scale: number;
  color: Vec3;
};

export const DEFAULT_CUBES: readonly SceneCube[] = [
  { position: [0, 0.5, 0], scale: 1, color: [0.49, 0.36, 1] },
  { position: [-2.5, 0.35, -1.5], scale: 0.7, color: [0.25, 0.73, 0.5] },
  { position: [2, 0.45, 1], scale: 0.85, color: [0.9, 0.71, 0.4] },
  { position: [-1, 0.25, 2.5], scale: 0.5, color: [0.9, 0.42, 0.36] },
  { position: [3, 0.6, -2], scale: 1.2, color: [0.49, 0.36, 1] },
];

export type CameraParams = {
  pitch: number;
  yaw: number;
  distance: number;
  fov: number;
};

export const DEFAULT_CAMERA_PARAMS: CameraParams = {
  pitch: -15,
  yaw: 45,
  distance: 8,
  fov: 45,
};
