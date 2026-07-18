import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "区分值与引用",
  "声明所有权",
  "用RAII封装句柄",
  "选择STL容器",
  "以迭代器遍历",
  "验证移动与失效",
] as const;

export function MgpAppendixModernCppMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="附录A 现代C++入门（A Modern C++ Primer）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function MgpAppendixModernCppExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="现代C++入门" nodes={nodes} mode="experiment" />;
}

export function MgpAppendixModernCppEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="现代C++入门" nodes={nodes} mode="evidence" />;
}
