"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "styles-themes",
  title: "样式与主题",
  task: "让颜色、style、theme 与属性覆盖形成可解释的资源继承链",
  owner: "Resources、Theme 与 View 属性解析器",
  state: "主题属性、style 父级、局部覆盖、日夜模式和最终像素",
  event: "切换 day/night、组件状态与局部 theme overlay",
  invariant: "内容语义与主题解耦，最终颜色保持对比度和状态可辨性",
  fault: "在布局写死颜色，夜间主题下文字与背景对比度不足",
  evidence: "属性解析链、资源 ID、日夜截图、对比度和状态断言",
  concepts: [
    "21. Styles and Themes",
    "Color Resources",
    "Styles",
    "Themes",
    "Adding Theme Colors",
    "Overriding Theme Attributes",
    "Modifying Button Attributes",
    "For the More Curious: More on Style Inheritance",
    "For the More Curious: Accessing Theme Attributes",
  ],
  transitions: [
    {
      action: "冻结入口：21. Styles and Themes",
      state:
        "记录Resources、Theme 与 View 属性解析器的初始主题属性、style 父级、局部覆盖、日夜模式和最终像素",
      evidence:
        "属性解析链、资源 ID、日夜截图、对比度和状态断言中的“21. Styles and Themes”轨迹",
    },
    {
      action: "触发事件：Styles",
      state:
        "以“切换 day/night、组件状态与局部 theme overlay”改变主题属性、style 父级、局部覆盖、日夜模式和最终像素",
      evidence:
        "属性解析链、资源 ID、日夜截图、对比度和状态断言中的“Styles”轨迹",
    },
    {
      action: "提交状态：Adding Theme Colors",
      state: "只由Resources、Theme 与 View 属性解析器提交新状态",
      evidence:
        "属性解析链、资源 ID、日夜截图、对比度和状态断言中的“Adding Theme Colors”轨迹",
    },
    {
      action: "重建边界：Modifying Button Attributes",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "属性解析链、资源 ID、日夜截图、对比度和状态断言中的“Modifying Button Attributes”轨迹",
    },
    {
      action: "核对交付：For the More Curious: Accessing Theme Attributes",
      state: "以“内容语义与主题解耦，最终颜色保持对比度和状态可辨性”判断通过",
      evidence: "属性解析链、资源 ID、日夜截图、对比度和状态断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“切换 day/night、组件状态与局部 theme overlay”",
      expected:
        "由Resources、Theme 与 View 属性解析器提交主题属性、style 父级、局部覆盖、日夜模式和最终像素，并持续满足“内容语义与主题解耦，最终颜色保持对比度和状态可辨性”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“在布局写死颜色，夜间主题下文字与背景对比度不足”",
      expected:
        "找到首个状态分岔，撤销后以属性解析链、资源 ID、日夜截图、对比度和状态断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function StylesThemesContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function StylesThemesLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function StylesThemesFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
