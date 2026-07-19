import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-05-02",
  title: "5.2 Node.js：我只需要一个店小二",
  family: "language",
  nodes: ["接收事件", "发起异步I/O", "系统等待", "回调入队", "事件循环执行"],
  concepts: ["5.2 Node.js：我只需要一个店小二"],
  mechanism:
    "Node.js 让 JavaScript 回调在事件循环阶段运行，许多 I/O 委托给系统后在就绪时回调；长时间 CPU 任务仍会阻塞该线程的其他回调",
  success: "5.2 Node.js：我只需要一个店小二 的输入、机制、输出与复位轨迹一致",
  failure:
    "5.2 Node.js：我只需要一个店小二 在“在请求回调内执行大规模同步计算，使所有连接的事件处理一起延迟”处拒绝",
} as const;

export function Crv18Section0502Lab() {
  return <CoderMechanismLab {...profile} />;
}
