import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Appendix B: Opening a project"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="附录B 打开项目" focus="从源码、构建描述和运行配置打开案例工程，验证依赖解析、入口、测试与工作目录" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="附录B 打开项目" focus="清空项目级缓存后从命令行构建，再由IDE导入，确认两条路径使用相同依赖和测试" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="附录B 打开项目" focus="克隆校验、构建命令、模块图、入口配置、首次失败记录" nodes={nodes} />;
}
