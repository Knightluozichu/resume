import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第21章 翱翔于三维空间——游戏摄像机的构建";
const focus = "由位置、朝向、上向量和视锥参数构造稳定观察与投影矩阵";
const stages = [
  "更新姿态",
  "正交基向量",
  "构造观察",
  "构造投影",
  "验证视锥"
];
const nodes = [
  {
    "label": "第21章 翱翔于三维空间——游戏摄像机的构建",
    "mechanism": "围绕由位置、朝向、上向量和视锥参数构造稳定观察与投影矩阵，对 第21章 翱翔于三维空间——游戏摄像机的构建，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留相机基向量、观察矩阵、视锥参数和测试点坐标。",
    "probe": "记录相机基向量、观察矩阵、视锥参数和测试点坐标"
  },
  {
    "label": "21.1 对摄像机的一些概述",
    "mechanism": "围绕由位置、朝向、上向量和视锥参数构造稳定观察与投影矩阵，21.1 对摄像机的一些概述 限定本章的一个知识坐标；独立解释围绕“维护正交相机基向量，将世界反向变换到相机空间后再投影”展开，并以“相机基向量正交归一，测试点的观察坐标和屏幕方向可复算”结束。",
    "probe": "记录相机基向量、观察矩阵、视锥参数和测试点坐标"
  },
  {
    "label": "21.2 开始设计摄像机类",
    "mechanism": "围绕由位置、朝向、上向量和视锥参数构造稳定观察与投影矩阵，21.2 开始设计摄像机类 限定本章的一个知识坐标；独立解释围绕“维护正交相机基向量，将世界反向变换到相机空间后再投影”展开，并以“相机基向量正交归一，测试点的观察坐标和屏幕方向可复算”结束。",
    "probe": "记录相机基向量、观察矩阵、视锥参数和测试点坐标"
  },
  {
    "label": "21.3 关于向量计算的函数讲解",
    "mechanism": "围绕由位置、朝向、上向量和视锥参数构造稳定观察与投影矩阵，对 21.3 关于向量计算的函数讲解，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录相机基向量、观察矩阵、视锥参数和测试点坐标"
  },
  {
    "label": "21.4 计算取景变换矩阵",
    "mechanism": "围绕由位置、朝向、上向量和视锥参数构造稳定观察与投影矩阵，对 21.4 计算取景变换矩阵，必须给出可复算中间量，先在纸面预测空间或像素结果，再用相机基向量、观察矩阵、视锥参数和测试点坐标查找首个数值分叉。",
    "probe": "记录相机基向量、观察矩阵、视锥参数和测试点坐标"
  },
  {
    "label": "21.5 类的其余实现细节",
    "mechanism": "围绕由位置、朝向、上向量和视锥参数构造稳定观察与投影矩阵，21.5 类的其余实现细节 限定本章的一个知识坐标；独立解释围绕“维护正交相机基向量，将世界反向变换到相机空间后再投影”展开，并以“相机基向量正交归一，测试点的观察坐标和屏幕方向可复算”结束。",
    "probe": "记录相机基向量、观察矩阵、视锥参数和测试点坐标"
  },
  {
    "label": "21.6 示例程序D3Ddemo16",
    "mechanism": "围绕由位置、朝向、上向量和视锥参数构造稳定观察与投影矩阵，对 21.6 示例程序D3Ddemo16，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留相机基向量、观察矩阵、视锥参数和测试点坐标。",
    "probe": "记录相机基向量、观察矩阵、视锥参数和测试点坐标"
  },
  {
    "label": "21.7 章节小憩",
    "mechanism": "围绕由位置、朝向、上向量和视锥参数构造稳定观察与投影矩阵，对 21.7 章节小憩，收尾不是装饰，而是要求用相机基向量、观察矩阵、视锥参数和测试点坐标复盘“相机基向量正交归一，测试点的观察坐标和屏幕方向可复算”是否在正常和失败路径同时成立。",
    "probe": "记录相机基向量、观察矩阵、视锥参数和测试点坐标"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "D3DX 相机矩阵",
  "modernLabel": "显式相机组件",
  "unit": "方向误差",
  "historicalBase": 20,
  "historicalSlope": 6,
  "modernBase": 10,
  "modernSlope": 1.5,
  "faultPenalty": 24,
  "invariant": "相机基向量正交归一，测试点的观察坐标和屏幕方向可复算",
  "fault": "朝向与上向量共线或旋转后未重新正交化",
  "evidence": "相机基向量、观察矩阵、视锥参数和测试点坐标"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj21GameCameraMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj21GameCameraExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj21GameCameraEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
