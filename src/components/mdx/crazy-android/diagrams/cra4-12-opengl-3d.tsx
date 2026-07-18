import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第12章 OpenGL与3D开发",
  "12.1 3D图形与3D开发的基本知识",
  "12.2 OpenGL和OpenGL ES简介",
  "12.3 绘制2D图形",
  "12.3.1 在Android应用中使用OpenGL ES",
  "12.3.2 绘制平面上的多边形",
  "12.3.3 旋转",
  "12.4 绘制3D图形",
  "12.4.1 构建3D图形",
  "12.4.2 应用纹理贴图",
  "12.5 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第12章 OpenGL与3D开发" focus="建立OpenGL ES渲染上下文、顶点、变换、2D/3D几何和纹理贴图的最小渲染管线" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第12章 OpenGL与3D开发" focus="建立OpenGL ES渲染上下文、顶点、变换、2D/3D几何和纹理贴图的最小渲染管线" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第12章 OpenGL与3D开发" focus="坐标与矩阵记录、顶点/纹理制品、帧截图、GL错误与上下文恢复测试" nodes={nodes} />; }
