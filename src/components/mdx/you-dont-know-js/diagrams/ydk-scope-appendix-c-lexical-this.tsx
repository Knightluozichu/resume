import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "进入普通函数调用",
  "根据调用点确定外层 this",
  "创建箭头函数",
  "箭头捕获外层绑定",
  "异步回调稍后执行",
  "仍读取同一 this",
] as const;

export function YdkScopeAppendixCLexicalThisMapLab() {
  return (
    <YdkjsMechanismLab
      title="附录 C this 词法"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkScopeAppendixCLexicalThisExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="附录 C this 词法"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkScopeAppendixCLexicalThisEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="附录 C this 词法"
      nodes={nodes}
      mode="evidence"
    />
  );
}
