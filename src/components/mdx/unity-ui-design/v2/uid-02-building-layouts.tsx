"use client";

import {
  UnityUiEvidenceLab,
  type UnityUiEvidenceModel,
} from "./unity-ui-evidence-lab";

const model = {
  unitId: "uid-02",
  title: "Chapter 2. Building Layouts",
  question:
    "怎样确定锚点、Layout Group、Fitter与Canvas Scaler的唯一尺寸写入者，并让输入路由不受重排破坏？",
  concepts: [
    "The Rect Transforms；The Rect Transform component",
    "The Canvas；The Canvas Renderer；Canvas Groups",
    "Horizontal Layout Group；Vertical Layout Group；Grid Layout Group",
    "Layout Element；Content Size Fitter；Aspect Ratio Fitter",
    "Scroll Rect；Masks；Resolution and scaling",
    "Constant Pixel Size；Scale with Screen Size；Constant Physical Size",
    "The UnityEvent system；Raycasting；Input modules；Event Triggers",
  ],
  viewports: [
    {
      name: "手机竖屏",
      width: 390,
      height: 844,
      safeInset: 7,
      scaleNote: "窄屏与安全区",
    },
    {
      name: "手机横屏",
      width: 844,
      height: 390,
      safeInset: 5,
      scaleNote: "超宽与短高度",
    },
    {
      name: "桌面窗口",
      width: 1440,
      height: 900,
      safeInset: 2,
      scaleNote: "参考分辨率之外",
    },
  ],
  panels: [
    {
      name: "商品网格",
      anchorMin: [0.05, 0.9],
      anchorMax: [0.05, 0.9],
      pivot: [0, 1],
      offset: "+16, -16",
      owner: "固定角点，由RectTransform offset定位",
    },
    {
      name: "滚动视口",
      anchorMin: [0.08, 0.08],
      anchorMax: [0.92, 0.22],
      pivot: [0.5, 0.5],
      offset: "16 px inset",
      owner: "水平与垂直拉伸，由父矩形分配尺寸",
    },
    {
      name: "缩放基准条",
      anchorMin: [0.5, 0.5],
      anchorMax: [0.5, 0.5],
      pivot: [0.5, 0.5],
      offset: "0, 0",
      owner: "中心锚定，由内容或布局元素声明尺寸",
    },
  ],
  normalRoute: [
    "“Chapter 2. Building Layouts”采集指针、触摸或导航输入，并固定设备、坐标与时间",
    "唯一活动Input Module为“Chapter 2. Building Layouts”生成类型化事件数据",
    "Graphic、2D或3D Raycaster按相机、排序和距离返回候选目标",
    "EventSystem为“Chapter 2. Building Layouts”选择首个合法目标并维护选择状态",
    "ExecuteEvents调用匹配接口，处理器提交RectTransform矩阵、Canvas与Renderer层级、布局输入输出、Fitter所有权、遮罩边界、缩放样本和事件射线路径。",
  ],
  failureRoute: [
    "“Chapter 2. Building Layouts”复用相同设备、坐标、层级、相机和初始状态",
    "只注入UI故障：Layout Group与Content Size Fitter循环写入同一尺寸，编辑器预览稳定而运行时持续重建",
    "输入模块或Raycaster在最早偏离点生成错误候选、顺序或事件数据",
    "目标不可达、重复接收或状态与画面分离，保留完整故障日志",
    "依据“同一RectTransform属性只有一个权威布局写入者，缩放策略有参考分辨率，射线目标与可见层级一致”拒绝发布并恢复已知场景快照",
  ],
  invariant:
    "同一RectTransform属性只有一个权威布局写入者，缩放策略有参考分辨率，射线目标与可见层级一致",
  fault:
    "Layout Group与Content Size Fitter循环写入同一尺寸，编辑器预览稳定而运行时持续重建",
  artifact:
    "RectTransform矩阵、Canvas与Renderer层级、布局输入输出、Fitter所有权、遮罩边界、缩放样本和事件射线路径。",
  gates: [
    {
      label: "层级与锚点",
      detail:
        "“Chapter 2. Building Layouts”的父子层级、Anchor Min/Max、Pivot与offset有版本化记录。",
    },
    {
      label: "布局所有权",
      detail:
        "“Chapter 2. Building Layouts”的每个尺寸和状态只有一个权威写入者，不发生布局循环。",
    },
    {
      label: "事件路由",
      detail:
        "“Chapter 2. Building Layouts”的输入模块、Raycaster、相机、目标和处理器可以逐跳重放。",
    },
    {
      label: "视口与构建",
      detail:
        "“Chapter 2. Building Layouts”经过窄屏、超宽、安全区、多输入方式、冷启动和目标构建复核。",
    },
  ],
} as const satisfies UnityUiEvidenceModel;

export function Uid02BuildingLayoutsLayoutProbe() {
  return <UnityUiEvidenceLab model={model} view="layout-probe" />;
}

export function Uid02BuildingLayoutsEventRouteLab() {
  return <UnityUiEvidenceLab model={model} view="event-route" />;
}

export function Uid02BuildingLayoutsReleaseGateLab() {
  return <UnityUiEvidenceLab model={model} view="release-gate" />;
}
