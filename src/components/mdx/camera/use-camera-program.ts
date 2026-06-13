"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  buildGridLines,
  cameraEyeFromAngles,
  CUBE_VERTICES,
  DEFAULT_CUBES,
  mat4Create,
  mat4LookAt,
  mat4Multiply,
  mat4Perspective,
  mat4Scale,
  mat4Translate,
  type CameraParams,
} from "./camera-math";

/**
 * 裸 WebGL2 摄像机视角 Demo 引擎（「摄像机」章 CameraDemo）。
 *
 * 渲染：XZ 网格 + 若干彩色立方体；View 由 pitch/yaw/distance 驱动 lookAt(eye, origin, up)。
 * 参数变 → 按需重绘；IntersectionObserver 离屏不重绘。
 */

const VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec3 aPos;
uniform mat4 uMvp;
void main() {
  gl_Position = uMvp * vec4(aPos, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
uniform vec3 uColor;
out vec4 fragColor;
void main() {
  fragColor = vec4(uColor, 1.0);
}`;

export type CameraStatus =
  | { kind: "ok" }
  | { kind: "error"; stage: "vertex" | "fragment" | "link"; log: string };

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  src: string,
): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function linkProgram(
  gl: WebGL2RenderingContext,
  vs: WebGLShader,
  fs: WebGLShader,
): WebGLProgram | null {
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

export function useCameraProgram(paramsRef: React.RefObject<CameraParams>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<CameraStatus>({ kind: "ok" });
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const cubeVaoRef = useRef<WebGLVertexArrayObject | null>(null);
  const gridVaoRef = useRef<WebGLVertexArrayObject | null>(null);
  const gridCountRef = useRef(0);
  const visibleRef = useRef(true);
  const rafRef = useRef<number | null>(null);

  const draw = useCallback(() => {
    const gl = glRef.current;
    const prog = progRef.current;
    const cubeVao = cubeVaoRef.current;
    const gridVao = gridVaoRef.current;
    const canvas = canvasRef.current;
    if (!gl || !prog || !cubeVao || !gridVao || !canvas || !visibleRef.current)
      return;

    const params = paramsRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.04, 0.04, 0.06, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const aspect = w / h;
    const eye = cameraEyeFromAngles(params.pitch, params.yaw, params.distance);

    const projection = mat4Create();
    mat4Perspective(projection, (params.fov * Math.PI) / 180, aspect, 0.1, 100);
    const view = mat4Create();
    mat4LookAt(view, eye, [0, 0.5, 0], [0, 1, 0]);

    const uMvp = gl.getUniformLocation(prog, "uMvp");
    const uColor = gl.getUniformLocation(prog, "uColor");
    gl.useProgram(prog);

    const mvp = mat4Create();
    const model = mat4Create();
    const scaleMat = mat4Create();
    const translateMat = mat4Create();
    const viewModel = mat4Create();

    // 网格
    gl.bindVertexArray(gridVao);
    mat4Multiply(viewModel, view, model);
    mat4Multiply(mvp, projection, viewModel);
    gl.uniformMatrix4fv(uMvp, false, mvp);
    gl.uniform3f(uColor, 0.35, 0.35, 0.42);
    gl.drawArrays(gl.LINES, 0, gridCountRef.current);

    // 立方体
    gl.bindVertexArray(cubeVao);
    for (const cube of DEFAULT_CUBES) {
      mat4Scale(scaleMat, cube.scale, cube.scale, cube.scale);
      mat4Translate(
        translateMat,
        cube.position[0],
        cube.position[1],
        cube.position[2],
      );
      mat4Multiply(model, translateMat, scaleMat);
      mat4Multiply(viewModel, view, model);
      mat4Multiply(mvp, projection, viewModel);
      gl.uniformMatrix4fv(uMvp, false, mvp);
      gl.uniform3f(uColor, cube.color[0], cube.color[1], cube.color[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    gl.bindVertexArray(null);
  }, [paramsRef]);

  const requestDraw = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      draw();
    });
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: false, antialias: true });
    if (!gl) {
      setStatus({
        kind: "error",
        stage: "link",
        log: "无法创建 WebGL2 上下文",
      });
      return;
    }
    glRef.current = gl;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs) {
      const errSh = gl.createShader(gl.VERTEX_SHADER);
      const log = errSh
        ? (gl.getShaderInfoLog(errSh) ?? "顶点着色器编译失败")
        : "顶点着色器编译失败";
      if (errSh) gl.deleteShader(errSh);
      setStatus({ kind: "error", stage: "vertex", log });
      return;
    }
    if (!fs) {
      setStatus({
        kind: "error",
        stage: "fragment",
        log: "片段着色器编译失败",
      });
      return;
    }
    const prog = linkProgram(gl, vs, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!prog) {
      setStatus({
        kind: "error",
        stage: "link",
        log: "程序链接失败",
      });
      return;
    }
    progRef.current = prog;

    // Cube VAO
    const cubeVao = gl.createVertexArray();
    const cubeBuf = gl.createBuffer();
    gl.bindVertexArray(cubeVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuf);
    gl.bufferData(gl.ARRAY_BUFFER, CUBE_VERTICES, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
    cubeVaoRef.current = cubeVao;

    // Grid VAO
    const gridVerts = buildGridLines(8, 1);
    gridCountRef.current = gridVerts.length / 3;
    const gridVao = gl.createVertexArray();
    const gridBuf = gl.createBuffer();
    gl.bindVertexArray(gridVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gridBuf);
    gl.bufferData(gl.ARRAY_BUFFER, gridVerts, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
    gridVaoRef.current = gridVao;

    gl.bindVertexArray(null);
    setStatus({ kind: "ok" });
    requestDraw();

    const ro = new ResizeObserver(() => requestDraw());
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
        if (visibleRef.current) requestDraw();
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (cubeVao) gl.deleteVertexArray(cubeVao);
      if (gridVao) gl.deleteVertexArray(gridVao);
      if (prog) gl.deleteProgram(prog);
      glRef.current = null;
    };
  }, [requestDraw]);

  return { canvasRef, status, requestDraw };
}
