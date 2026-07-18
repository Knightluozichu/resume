import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "创建待定 Promise",
  "启动产生未来值的操作",
  "以兑现或拒绝只结算一次",
  "把处理器排入微任务",
  "吸收处理器返回值或异常",
  "沿链传播最终结果",
] as const;

export function YdkAsync03PromisesMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 3 章 Promise"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkAsync03PromisesExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 3 章 Promise"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkAsync03PromisesEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 3 章 Promise"
      nodes={nodes}
      mode="evidence"
    />
  );
}
