import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "定义团队基线",
  "自动格式检查",
  "约束命名作用域",
  "审查异步模块边界",
  "接入版本Hook",
  "持续集成签发",
] as const;
const concepts = [
  "附录C Node编码规范",
  "C.1 根源",
  "C.2 编码规范",
  "C.2.1 空格与格式",
  "C.2.2 命名规范",
  "C.2.3 比较操作",
  "C.2.4 字面量",
  "C.2.5 作用域",
  "C.2.6 数组与对象",
  "C.2.7 异步",
  "C.2.8 类与模块",
  "C.2.9 注解规范",
  "C.3 最佳实践",
  "C.3.1 冲突的解决原则",
  "C.3.2 给编辑器设置检测工具",
  "C.3.3 版本控制中的Hook",
  "C.3.4 持续集成",
  "C.4 总结",
  "C.5 参考资源",
] as const;

export function DnjAppendixCCodingStyleMapLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 C Node 编码规范 · 运行地图"
      label="Deep Node / Map"
      color="#a16207"
      soft="#fef9c3"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function DnjAppendixCCodingStyleExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 C Node 编码规范 · 边界实验"
      label="Deep Node / Experiment"
      color="#a16207"
      soft="#fef9c3"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function DnjAppendixCCodingStyleEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 C Node 编码规范 · 关闭证据"
      label="Deep Node / Evidence"
      color="#a16207"
      soft="#fef9c3"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
