"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "xml-drawables",
  title: "XML drawable",
  task: "用 shape、selector、layer-list 与 9-patch 表达可缩放状态图形",
  owner: "Drawable 资源、View state 与资源匹配器",
  state: "边角、描边、图层、pressed/disabled 状态和密度",
  event: "按下、禁用、缩放、换密度与切换主题",
  invariant: "图形状态与可点击语义一致，在目标密度不模糊或错位",
  fault: "selector 缺少 disabled 项，禁用按钮仍看起来可点击",
  evidence: "drawable 命中、state set、像素边界、密度截图和交互断言",
  concepts: [
    "22. XML Drawables",
    "Making Uniform Buttons",
    "Shape Drawables",
    "State List Drawables",
    "Layer List Drawables",
    "For the More Curious: Why Bother with XML Drawables?",
    "For the More Curious: Mipmap Images",
    "For the More Curious: 9-Patch Images",
    "Challenge: Button Themes",
  ],
  transitions: [
    {
      action: "冻结入口：22. XML Drawables",
      state:
        "记录Drawable 资源、View state 与资源匹配器的初始边角、描边、图层、pressed/disabled 状态和密度",
      evidence:
        "drawable 命中、state set、像素边界、密度截图和交互断言中的“22. XML Drawables”轨迹",
    },
    {
      action: "触发事件：Shape Drawables",
      state:
        "以“按下、禁用、缩放、换密度与切换主题”改变边角、描边、图层、pressed/disabled 状态和密度",
      evidence:
        "drawable 命中、state set、像素边界、密度截图和交互断言中的“Shape Drawables”轨迹",
    },
    {
      action: "提交状态：Layer List Drawables",
      state: "只由Drawable 资源、View state 与资源匹配器提交新状态",
      evidence:
        "drawable 命中、state set、像素边界、密度截图和交互断言中的“Layer List Drawables”轨迹",
    },
    {
      action: "重建边界：For the More Curious: Mipmap Images",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "drawable 命中、state set、像素边界、密度截图和交互断言中的“For the More Curious: Mipmap Images”轨迹",
    },
    {
      action: "核对交付：Challenge: Button Themes",
      state: "以“图形状态与可点击语义一致，在目标密度不模糊或错位”判断通过",
      evidence: "drawable 命中、state set、像素边界、密度截图和交互断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“按下、禁用、缩放、换密度与切换主题”",
      expected:
        "由Drawable 资源、View state 与资源匹配器提交边角、描边、图层、pressed/disabled 状态和密度，并持续满足“图形状态与可点击语义一致，在目标密度不模糊或错位”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“selector 缺少 disabled 项，禁用按钮仍看起来可点击”",
      expected:
        "找到首个状态分岔，撤销后以drawable 命中、state set、像素边界、密度截图和交互断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function XmlDrawablesContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function XmlDrawablesLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function XmlDrawablesFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
