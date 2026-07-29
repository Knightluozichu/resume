"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "localization",
  title: "应用本地化",
  task: "让资源匹配器按 locale、方向、尺寸与密度选择可回退资源",
  owner: "Android Resources 与 locale 配置",
  state: "字符串、复数、日期格式、布局方向和候选资源",
  event: "切换英语、中文、阿拉伯语、大字体与区域格式",
  invariant: "用户可见文本来自资源和 locale 格式化，不拼接固定英语语序",
  fault: "把日期和数量手工拼进英文句子，阿拉伯语下语序和数字错误",
  evidence: "配置值、资源命中、伪本地化截图、RTL 与格式断言",
  concepts: [
    "17. Localization",
    "Localizing Resources",
    "Configuration Qualifiers",
    "Testing Alternative Resources",
    "For the More Curious: More on Determining Device Size",
    "Challenge: Localizing Dates",
  ],
  transitions: [
    {
      action: "冻结入口：17. Localization",
      state:
        "记录Android Resources 与 locale 配置的初始字符串、复数、日期格式、布局方向和候选资源",
      evidence:
        "配置值、资源命中、伪本地化截图、RTL 与格式断言中的“17. Localization”轨迹",
    },
    {
      action: "触发事件：Localizing Resources",
      state:
        "以“切换英语、中文、阿拉伯语、大字体与区域格式”改变字符串、复数、日期格式、布局方向和候选资源",
      evidence:
        "配置值、资源命中、伪本地化截图、RTL 与格式断言中的“Localizing Resources”轨迹",
    },
    {
      action: "提交状态：Configuration Qualifiers",
      state: "只由Android Resources 与 locale 配置提交新状态",
      evidence:
        "配置值、资源命中、伪本地化截图、RTL 与格式断言中的“Configuration Qualifiers”轨迹",
    },
    {
      action: "重建边界：For the More Curious: More on Determining Device Size",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "配置值、资源命中、伪本地化截图、RTL 与格式断言中的“For the More Curious: More on Determining Device Size”轨迹",
    },
    {
      action: "核对交付：Challenge: Localizing Dates",
      state:
        "以“用户可见文本来自资源和 locale 格式化，不拼接固定英语语序”判断通过",
      evidence: "配置值、资源命中、伪本地化截图、RTL 与格式断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“切换英语、中文、阿拉伯语、大字体与区域格式”",
      expected:
        "由Android Resources 与 locale 配置提交字符串、复数、日期格式、布局方向和候选资源，并持续满足“用户可见文本来自资源和 locale 格式化，不拼接固定英语语序”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“把日期和数量手工拼进英文句子，阿拉伯语下语序和数字错误”",
      expected:
        "找到首个状态分岔，撤销后以配置值、资源命中、伪本地化截图、RTL 与格式断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function LocalizationContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function LocalizationLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function LocalizationFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
