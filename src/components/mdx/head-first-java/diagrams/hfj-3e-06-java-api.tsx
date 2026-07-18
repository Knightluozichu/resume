import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e06JavaApiMapLab() {
  return (
    <HfjReferenceMapLab
      title="第6章 使用 Java 类库：认识 API · 对象/执行图"
      focus="用 ArrayList 和官方 API 文档替代脆弱自制结构，并读懂类的完整名称与方法合同"
      stages={stages}
    />
  );
}

export function Hfj3e06JavaApiExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第6章 使用 Java 类库：认识 API · 执行实验"
      focus="StartupBust 重构、数组/列表对照与 API 查询记录"
      stages={stages}
    />
  );
}

export function Hfj3e06JavaApiEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第6章 使用 Java 类库：认识 API · 失败证据"
      focus="凭方法名猜 API，或只会复制调用而不能说明类型、参数、返回值和异常"
      stages={stages}
    />
  );
}
