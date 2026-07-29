"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-04",
  title: "第 4 章：循环、数组、枚举与树枝机制",
  focus:
    "用循环、数组、enum class、switch 与函数把树枝生长和命中规则表达成有限、可检查的状态变换",
  invariant:
    "树枝数组的索引范围始终有效，新增状态只通过受控分支产生，函数调用前后保持数组长度与枚举合法性",
  fault: "把数组整体上移时从头向后复制，覆盖尚未读取的树枝状态",
  evidence: "循环上下界、每次数组快照、枚举值、switch 分支和函数输入输出",
  concepts: [
    "循环（loops）",
    "数组（arrays）",
    "switch 语句（switch）",
    "函数（functions）",
    "树枝生长（growing the branches）",
  ],
  zones: [
    {
      label: "离散状态",
      detail: "树枝数组、位置索引与 enum class",
    },
    {
      label: "控制规则",
      detail: "for/while、switch 和函数边界",
    },
    {
      label: "游戏结果",
      detail: "新树枝生成、旧树枝移动与可见布局",
    },
  ],
  trace: ["保存旧数组", "检查循环界", "移动元素", "生成新状态", "验证布局"],
  scenarios: [
    {
      label: "安全移动树枝",
      input: "给定一组已知树枝方向，从末尾向前移动数组",
      expected: "每个旧元素只被读取一次，新元素仅写入首位",
    },
    {
      label: "边界枚举输入",
      input: "输入 None、Left、Right 三种合法状态并尝试非法整数",
      expected: "合法状态命中唯一分支，非法值不能静默进入游戏状态",
    },
  ],
} satisfies CppGameBuildModel;

export function FlowControlPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function FlowControlFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function FlowControlFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
