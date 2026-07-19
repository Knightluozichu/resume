import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-chapter-04",
  title: "第4章 代码管理那些事儿",
  family: "engineering",
  nodes: ["建立变更", "提交历史", "解析构建", "自动验证", "发布回退"],
  concepts: ["第4章 代码管理那些事儿"],
  mechanism:
    "代码管理把变更身份、构建依赖、自动测试、缺陷证据和发布产物连成可审查流水线",
  success: "第4章 代码管理那些事儿 的输入、机制、输出与复位轨迹一致",
  failure:
    "第4章 代码管理那些事儿 在“一次提交同时混入无关重构与功能，失败后无法独立回退或定位”处拒绝",
} as const;

export function Crv18Chapter04Lab() {
  return <CoderMechanismLab {...profile} />;
}
