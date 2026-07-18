import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const failure: RustWayCase[] = [
  { label: "类型消除", input: "可能缺失或失败的操作", mechanism: "Option/Result进入签名", result: "调用者被迫处理", invariant: "失败不是正常值的特殊哨兵。" },
  { label: "边界验证", input: "外部字符串与配置", mechanism: "parse、validate、normalize", result: "内部有效类型", invariant: "无效状态不能越过边界进入核心逻辑。" },
  { label: "不变量设计", input: "构造参数", mechanism: "私有字段加受检构造器", result: "构造后始终合法的对象", invariant: "方法只需处理已证明的内部状态。" },
];
const channels: RustWayCase[] = [
  { label: "Option", input: "有或无，不需要原因", mechanism: "Some/None穷尽处理", result: "显式缺失", invariant: "None不能同时承担多种不可区分错误。" },
  { label: "Result", input: "可能失败且需要上下文", mechanism: "Ok/Err与?传播", result: "类型化错误路径", invariant: "错误保留source与操作上下文。" },
  { label: "panic", input: "被破坏的不变量或程序缺陷", mechanism: "终止或unwind", result: "当前控制流不能恢复", invariant: "库不能用panic处理普通外部输入错误。" },
];
const thirdParty: RustWayCase[] = [
  { label: "保留来源", input: "第三方Error", mechanism: "source chain或transparent wrapper", result: "可诊断因果链", invariant: "不要只保留一条丢类型的字符串。" },
  { label: "翻译边界", input: "库内部错误", mechanism: "映射为领域错误variant", result: "稳定公开API", invariant: "外部依赖升级不应任意破坏调用者匹配。" },
  { label: "附加上下文", input: "低层I/O失败", mechanism: "记录路径、操作与输入坐标", result: "可定位错误", invariant: "敏感数据不能被上下文日志泄露。" },
];
export function RswFailureEliminationLab() { return <RustWayOfficialLab title="从设计中消除失败" caption="先缩小无效状态空间，再选择错误通道。" cases={failure} tone="emerald" />; }
export function RswErrorChannelLab() { return <RustWayOfficialLab title="Option、Result与panic" caption="缺失、可恢复失败和不变量崩溃不能混用一个通道。" cases={channels} tone="rose" />; }
export function RswThirdPartyErrorLab() { return <RustWayOfficialLab title="第三方库错误边界" caption="保留来源、翻译公开语义并补足操作上下文。" cases={thirdParty} tone="amber" />; }
