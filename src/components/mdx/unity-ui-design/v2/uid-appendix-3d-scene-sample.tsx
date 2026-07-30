"use client";

import {
  UnityUiEvidenceLab,
  type UnityUiEvidenceModel,
} from "./unity-ui-evidence-lab";

const model = {
  unitId: "uid-app",
  title: "Appendix. The 3D Scene Sample",
  question:
    "怎样建立可复现的3D示例基线，使后续世界空间UI和事件实验不是依赖未记录的场景偶然状态？",
  concepts: ["Setting up for the big game", "The initial 3D scene"],
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
      name: "场景基线卡",
      anchorMin: [0.05, 0.9],
      anchorMax: [0.05, 0.9],
      pivot: [0, 1],
      offset: "+16, -16",
      owner: "固定角点，由RectTransform offset定位",
    },
    {
      name: "相机视口",
      anchorMin: [0.08, 0.08],
      anchorMax: [0.92, 0.22],
      pivot: [0.5, 0.5],
      offset: "16 px inset",
      owner: "水平与垂直拉伸，由父矩形分配尺寸",
    },
    {
      name: "初始状态栏",
      anchorMin: [0.5, 0.5],
      anchorMax: [0.5, 0.5],
      pivot: [0.5, 0.5],
      offset: "0, 0",
      owner: "中心锚定，由内容或布局元素声明尺寸",
    },
  ],
  normalRoute: [
    "“Appendix. The 3D Scene Sample”采集指针、触摸或导航输入，并固定设备、坐标与时间",
    "唯一活动Input Module为“Appendix. The 3D Scene Sample”生成类型化事件数据",
    "Graphic、2D或3D Raycaster按相机、排序和距离返回候选目标",
    "EventSystem为“Appendix. The 3D Scene Sample”选择首个合法目标并维护选择状态",
    "ExecuteEvents调用匹配接口，处理器提交Unity版本、工程设置、场景层级、Transform、相机、光照、碰撞层、Canvas、输入模块和冷启动截图。",
  ],
  failureRoute: [
    "“Appendix. The 3D Scene Sample”复用相同设备、坐标、层级、相机和初始状态",
    "只注入UI故障：示例只保存截图，没有记录层级、相机和碰撞层，重开工程后事件目标完全不同",
    "输入模块或Raycaster在最早偏离点生成错误候选、顺序或事件数据",
    "目标不可达、重复接收或状态与画面分离，保留完整故障日志",
    "依据“场景对象、Transform、相机、碰撞层、Canvas和初始交互状态均有版本化快照”拒绝发布并恢复已知场景快照",
  ],
  invariant:
    "场景对象、Transform、相机、碰撞层、Canvas和初始交互状态均有版本化快照",
  fault:
    "示例只保存截图，没有记录层级、相机和碰撞层，重开工程后事件目标完全不同",
  artifact:
    "Unity版本、工程设置、场景层级、Transform、相机、光照、碰撞层、Canvas、输入模块和冷启动截图。",
  gates: [
    {
      label: "层级与锚点",
      detail:
        "“Appendix. The 3D Scene Sample”的父子层级、Anchor Min/Max、Pivot与offset有版本化记录。",
    },
    {
      label: "布局所有权",
      detail:
        "“Appendix. The 3D Scene Sample”的每个尺寸和状态只有一个权威写入者，不发生布局循环。",
    },
    {
      label: "事件路由",
      detail:
        "“Appendix. The 3D Scene Sample”的输入模块、Raycaster、相机、目标和处理器可以逐跳重放。",
    },
    {
      label: "视口与构建",
      detail:
        "“Appendix. The 3D Scene Sample”经过窄屏、超宽、安全区、多输入方式、冷启动和目标构建复核。",
    },
  ],
} as const satisfies UnityUiEvidenceModel;

export function UidAppendix3dSceneSampleLayoutProbe() {
  return <UnityUiEvidenceLab model={model} view="layout-probe" />;
}

export function UidAppendix3dSceneSampleEventRouteLab() {
  return <UnityUiEvidenceLab model={model} view="event-route" />;
}

export function UidAppendix3dSceneSampleReleaseGateLab() {
  return <UnityUiEvidenceLab model={model} view="release-gate" />;
}
