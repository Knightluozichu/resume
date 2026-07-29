"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "architecturedomaindesign-11",
  title: "六边形架构",
  focus:
    "把应用核心与用户、测试、批处理、数据库和设备隔开，通过端口声明意图、适配器翻译技术协议",
  invariant:
    "应用可以在没有真实用户界面和数据库时运行，外部技术通过端口接入而不改写内部业务语义",
  fault:
    "把六边形理解为必须存在六条边，或只把 Controller 改名 Adapter 而保留核心对框架的依赖",
  evidence:
    "端口清单、驱动与被驱动方向、适配器合同测试、无 UI 运行、内存存储替换与协议翻译样本",
  concepts: [
    "系统内外",
    "端口",
    "适配器",
    "驱动侧",
    "被驱动侧",
    "用户界面与数据库隔离",
    "测试隔离",
  ],
  zones: [
    {
      label: "驱动适配器",
      detail: "Web、CLI、批处理与自动化测试",
    },
    {
      label: "应用与端口",
      detail: "业务用例及输入输出交互意图",
    },
    {
      label: "被驱动适配器",
      detail: "数据库、消息、设备与外部服务",
    },
  ],
  trace: [
    "识别外部参与者",
    "定义输入端口",
    "执行应用行为",
    "调用输出端口",
    "替换适配器测试",
  ],
  scenarios: [
    {
      label: "无界面验收",
      input: "用测试脚本直接提交借书请求并检查结果",
      expected: "测试适配器驱动同一输入端口，不复制应用规则",
    },
    {
      label: "存储替换",
      input: "验收时用内存仓储，生产使用 SQL 仓储",
      expected: "两个适配器满足同一输出端口合同，应用核心无需分支判断",
    },
  ],
} satisfies ArchitectureCourseModel;

export function HexagonalArchitectureBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function HexagonalArchitectureTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function HexagonalArchitectureViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
