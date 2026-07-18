import { GoActionOfficialLab, type GoActionCase } from "./official-lab";
const cases: GoActionCase[] = [
  { label: "Runner", input: "顺序任务、timeout与interrupt", mechanism: "select监控完成、超时和系统信号", evidence: "受控程序寿命", invariant: "停止接受工作并等待已启动任务退出。" },
  { label: "Pool acquire", input: "有限可复用资源", mechanism: "buffered channel借出", evidence: "最多N个并发使用者", invariant: "关闭后不再借出，获取失败可区分。" },
  { label: "Pool release", input: "使用完或失败资源", mechanism: "归还或关闭损坏资源", evidence: "资源可复用或销毁", invariant: "每次成功获取恰有一次归还或释放。" },
  { label: "Work", input: "任务队列与固定worker", mechanism: "goroutine pool消费并Wait", evidence: "有界并发处理", invariant: "队列关闭、panic和完成等待都有协议。" },
];
export function GiaRunnerLab(){return <GoActionOfficialLab title="Runner模式" caption="完成、超时和中断竞争决定程序如何停止。" cases={cases}/>;}
export function GiaPoolLab(){return <GoActionOfficialLab title="资源池" caption="获取、使用、归还、损坏与关闭形成资源生命周期。" cases={cases} tone="amber" initial={1}/>;}
export function GiaWorkLab(){return <GoActionOfficialLab title="Work模式" caption="固定worker数量控制并发，并以关闭和Wait收束。" cases={cases} tone="emerald" initial={3}/>;}
