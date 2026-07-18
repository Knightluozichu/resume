import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3eOfficialLearningMapMapLab() {
  return (
    <HfjReferenceMapLab
      title="《Head First Java（第3版）》权威学习地图 · 对象/执行图"
      focus="沿对象模型、类库、函数式数据处理、GUI、I/O、网络与并发建立完整 Java 17 能力链"
      stages={stages}
    />
  );
}

export function Hfj3eOfficialLearningMapExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="《Head First Java（第3版）》权威学习地图 · 执行实验"
      focus="21单元路线、406个核心目录节点覆盖表与全书运行证据档案"
      stages={stages}
    />
  );
}

export function Hfj3eOfficialLearningMapEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="《Head First Java（第3版）》权威学习地图 · 失败证据"
      focus="按旧版八个主题跳读，遗漏构造/GC、异常、序列化、Lambda/Stream 和并发正确性"
      stages={stages}
    />
  );
}
