"use client";

import {
  UnityUiEvidenceLab,
  type UnityUiEvidenceModel,
} from "./unity-ui-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《Unity 3D UI Essentials》38组目录学习地图",
  question:
    "怎样保留2015年Unity 4.6新uGUI的原书语境，同时用现行uGUI资料验证稳定机制并标出UI Toolkit边界？",
  concepts: [
    "Chapter 1. Looking Back, Looking Forward",
    "Chapter 2. Building Layouts",
    "Chapter 3. Control, Control, You Must Learn Control",
    "Chapter 4. Anchors Away",
    "Chapter 5. Screen Space, World Space, and the Camera",
    "Chapter 6. Working with the UI Source",
    "Appendix. The 3D Scene Sample",
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
      name: "全书目录面板",
      anchorMin: [0.05, 0.9],
      anchorMax: [0.05, 0.9],
      pivot: [0, 1],
      offset: "+16, -16",
      owner: "固定角点，由RectTransform offset定位",
    },
    {
      name: "系统边界提示",
      anchorMin: [0.08, 0.08],
      anchorMax: [0.92, 0.22],
      pivot: [0.5, 0.5],
      offset: "16 px inset",
      owner: "水平与垂直拉伸，由父矩形分配尺寸",
    },
    {
      name: "发布证据栏",
      anchorMin: [0.5, 0.5],
      anchorMax: [0.5, 0.5],
      pivot: [0.5, 0.5],
      offset: "0, 0",
      owner: "中心锚定，由内容或布局元素声明尺寸",
    },
  ],
  normalRoute: [
    "“《Unity 3D UI Essentials》38组目录学习地图”采集指针、触摸或导航输入，并固定设备、坐标与时间",
    "唯一活动Input Module为“《Unity 3D UI Essentials》38组目录学习地图”生成类型化事件数据",
    "Graphic、2D或3D Raycaster按相机、排序和距离返回候选目标",
    "EventSystem为“《Unity 3D UI Essentials》38组目录学习地图”选择首个合法目标并维护选择状态",
    "ExecuteEvents调用匹配接口，处理器提交38组条目映射、2015与现行系统标签、层级、锚点、布局所有权、画布模式、事件路由、分辨率矩阵、迁移与回退说明。",
  ],
  failureRoute: [
    "“《Unity 3D UI Essentials》38组目录学习地图”复用相同设备、坐标、层级、相机和初始状态",
    "只注入UI故障：把Unity 6的UI Toolkit推荐、包结构和当前菜单直接写成2015年原书步骤",
    "输入模块或Raycaster在最早偏离点生成错误候选、顺序或事件数据",
    "目标不可达、重复接收或状态与画面分离，保留完整故障日志",
    "依据“七个原书单元各有唯一归属，布局、缩放、渲染、射线和事件路径可复现，现代UI系统不倒填原书”拒绝发布并恢复已知场景快照",
  ],
  invariant:
    "七个原书单元各有唯一归属，布局、缩放、渲染、射线和事件路径可复现，现代UI系统不倒填原书",
  fault: "把Unity 6的UI Toolkit推荐、包结构和当前菜单直接写成2015年原书步骤",
  artifact:
    "38组条目映射、2015与现行系统标签、层级、锚点、布局所有权、画布模式、事件路由、分辨率矩阵、迁移与回退说明。",
  gates: [
    {
      label: "层级与锚点",
      detail:
        "“《Unity 3D UI Essentials》38组目录学习地图”的父子层级、Anchor Min/Max、Pivot与offset有版本化记录。",
    },
    {
      label: "布局所有权",
      detail:
        "“《Unity 3D UI Essentials》38组目录学习地图”的每个尺寸和状态只有一个权威写入者，不发生布局循环。",
    },
    {
      label: "事件路由",
      detail:
        "“《Unity 3D UI Essentials》38组目录学习地图”的输入模块、Raycaster、相机、目标和处理器可以逐跳重放。",
    },
    {
      label: "视口与构建",
      detail:
        "“《Unity 3D UI Essentials》38组目录学习地图”经过窄屏、超宽、安全区、多输入方式、冷启动和目标构建复核。",
    },
  ],
} as const satisfies UnityUiEvidenceModel;

export function UidOfficialLearningMapLayoutProbe() {
  return <UnityUiEvidenceLab model={model} view="layout-probe" />;
}

export function UidOfficialLearningMapEventRouteLab() {
  return <UnityUiEvidenceLab model={model} view="event-route" />;
}

export function UidOfficialLearningMapReleaseGateLab() {
  return <UnityUiEvidenceLab model={model} view="release-gate" />;
}
