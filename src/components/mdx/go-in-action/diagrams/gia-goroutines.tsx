import { GoActionOfficialLab, type GoActionCase } from "./official-lab";
const cases: GoActionCase[] = [
  { label: "Scheduler", input: "可运行与阻塞goroutine", mechanism: "G、M、P调度到OS线程", evidence: "并发执行", invariant: "调度顺序不可作为正确性条件。" },
  { label: "Race", input: "无同步共享读写", mechanism: "交错访问", evidence: "不确定结果与race报告", invariant: "共享状态必须有同步或owner转移。" },
  { label: "Lock/Atomic", input: "共享计数或复合状态", mechanism: "atomic或Mutex临界区", evidence: "受序更新", invariant: "原子适合单值，复合不变量在同一锁下。" },
  { label: "Channel", input: "值与发送接收方", mechanism: "无缓冲握手或有缓冲队列", evidence: "通信与同步", invariant: "发送方关闭，所有路径有退出。" },
];
export function GiaSchedulerLab(){return <GoActionOfficialLab title="并发、并行与调度" caption="G-M-P只解释运行机制，正确性仍由同步协议保证。" cases={cases}/>;}
export function GiaRaceLab(){return <GoActionOfficialLab title="竞态检测与锁" caption="Race detector给出证据，锁或owner转移消除未同步访问。" cases={cases} tone="rose" initial={1}/>;}
export function GiaChannelLab(){return <GoActionOfficialLab title="无缓冲与有缓冲Channel" caption="容量改变发送阻塞点，不改变关闭责任。" cases={cases} tone="emerald" initial={3}/>;}
