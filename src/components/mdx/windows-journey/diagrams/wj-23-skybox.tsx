import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第23章 向碧蓝的苍穹致敬——三维天空的构建";
const focus = "让天空随相机平移但不产生近处视差，并隔离深度和剔除状态";
const stages = [
  "读取相机",
  "居中几何",
  "采样天空",
  "限制深度",
  "恢复状态"
];
const nodes = [
  {
    "label": "第23章 向碧蓝的苍穹致敬——三维天空的构建",
    "mechanism": "围绕让天空随相机平移但不产生近处视差，并隔离深度和剔除状态，第23章 向碧蓝的苍穹致敬——三维天空的构建 限定本章的一个知识坐标；独立解释围绕“以相机为中心绘制天空几何，使用一致贴图接缝并在受控深度状态下提交”展开，并以“相机平移不改变天空方向采样，天空绘制后所有渲染状态恢复”结束。",
    "probe": "记录相机位置抵消、纹理方向、深度状态、绘制顺序和接缝像素"
  },
  {
    "label": "23.1 三维天空技术阐述",
    "mechanism": "围绕让天空随相机平移但不产生近处视差，并隔离深度和剔除状态，23.1 三维天空技术阐述 限定本章的一个知识坐标；独立解释围绕“以相机为中心绘制天空几何，使用一致贴图接缝并在受控深度状态下提交”展开，并以“相机平移不改变天空方向采样，天空绘制后所有渲染状态恢复”结束。",
    "probe": "记录相机位置抵消、纹理方向、深度状态、绘制顺序和接缝像素"
  },
  {
    "label": "23.2 天空盒的设计",
    "mechanism": "围绕让天空随相机平移但不产生近处视差，并隔离深度和剔除状态，23.2 天空盒的设计 限定本章的一个知识坐标；独立解释围绕“以相机为中心绘制天空几何，使用一致贴图接缝并在受控深度状态下提交”展开，并以“相机平移不改变天空方向采样，天空绘制后所有渲染状态恢复”结束。",
    "probe": "记录相机位置抵消、纹理方向、深度状态、绘制顺序和接缝像素"
  },
  {
    "label": "23.3 天空盒类的实现",
    "mechanism": "围绕让天空随相机平移但不产生近处视差，并隔离深度和剔除状态，23.3 天空盒类的实现 限定本章的一个知识坐标；独立解释围绕“以相机为中心绘制天空几何，使用一致贴图接缝并在受控深度状态下提交”展开，并以“相机平移不改变天空方向采样，天空绘制后所有渲染状态恢复”结束。",
    "probe": "记录相机位置抵消、纹理方向、深度状态、绘制顺序和接缝像素"
  },
  {
    "label": "23.4 天空盒类的使用",
    "mechanism": "围绕让天空随相机平移但不产生近处视差，并隔离深度和剔除状态，23.4 天空盒类的使用 限定本章的一个知识坐标；独立解释围绕“以相机为中心绘制天空几何，使用一致贴图接缝并在受控深度状态下提交”展开，并以“相机平移不改变天空方向采样，天空绘制后所有渲染状态恢复”结束。",
    "probe": "记录相机位置抵消、纹理方向、深度状态、绘制顺序和接缝像素"
  },
  {
    "label": "23.5 示例程序D3Ddemo18",
    "mechanism": "围绕让天空随相机平移但不产生近处视差，并隔离深度和剔除状态，对 23.5 示例程序D3Ddemo18，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留相机位置抵消、纹理方向、深度状态、绘制顺序和接缝像素。",
    "probe": "记录相机位置抵消、纹理方向、深度状态、绘制顺序和接缝像素"
  },
  {
    "label": "23.6 章节小憩",
    "mechanism": "围绕让天空随相机平移但不产生近处视差，并隔离深度和剔除状态，对 23.6 章节小憩，收尾不是装饰，而是要求用相机位置抵消、纹理方向、深度状态、绘制顺序和接缝像素复盘“相机平移不改变天空方向采样，天空绘制后所有渲染状态恢复”是否在正常和失败路径同时成立。",
    "probe": "记录相机位置抵消、纹理方向、深度状态、绘制顺序和接缝像素"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "六面天空盒",
  "modernLabel": "立方体贴图天空",
  "unit": "接缝像素",
  "historicalBase": 17,
  "historicalSlope": 5.5,
  "modernBase": 8,
  "modernSlope": 1.4,
  "faultPenalty": 22,
  "invariant": "相机平移不改变天空方向采样，天空绘制后所有渲染状态恢复",
  "fault": "天空开启深度写入或忘记恢复剔除模式",
  "evidence": "相机位置抵消、纹理方向、深度状态、绘制顺序和接缝像素"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj23SkyboxMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj23SkyboxExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj23SkyboxEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
