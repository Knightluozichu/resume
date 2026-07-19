import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-04-01",
  title: "4.1 版本管理简史",
  family: "engineering",
  nodes: ["写入Blob", "生成Tree", "创建Commit", "移动Ref", "合并祖先"],
  concepts: [
    "4.1 版本管理简史",
    "“人肉” 版本管理",
    "锁定文件：避免互相覆盖",
    "允许冲突：退一步海阔天空",
    "分支：多版本并行",
    "分布式管理：给程序员放权",
    "程序员也爱社交",
  ],
  mechanism:
    "Git 用 blob、tree、commit 和引用组成不可变对象图；分支是移动引用，合并依据共同祖先组合历史",
  success: "4.1 版本管理简史 的输入、机制、输出与复位轨迹一致",
  failure:
    "4.1 版本管理简史 在“把分支当成文件副本并用覆盖目录解决分歧，丢失共同祖先和变更语义”处拒绝",
} as const;

export function Crv18Section0401Lab() {
  return <CoderMechanismLab {...profile} />;
}
