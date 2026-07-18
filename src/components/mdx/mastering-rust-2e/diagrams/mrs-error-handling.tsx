import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "可恢复错误", input: "目标与输入", rule: "Result把成功值和失败值放进类型，调用者必须选择传播、转换或恢复", evidence: "可恢复错误的边界测试与结果记录", invariant: "Result把成功值和失败值放进类型，调用者必须选择传播、转换或恢复；错误类型应携带可判断上下文，而不是只返回模糊字符串。" },
  { label: "Option 与 Result 组合子", input: "可恢复错误", rule: "map、and_then、ok_or_else等组合子把直线路径与失败路径分开", evidence: "Option 与 Result 组合子的边界测试与结果记录", invariant: "map、and_then、ok_or_else等组合子把直线路径与失败路径分开；链条过长时使用显式match可以提高诊断和可读性。" },
  { label: "问号运算符与提前返回", input: "Option 与 Result 组合子", rule: "问号运算符在失败时通过From转换并提前返回，成功时解包", evidence: "问号运算符与提前返回的边界测试与结果记录", invariant: "问号运算符在失败时通过From转换并提前返回，成功时解包；它简化传播但不会自动增加操作上下文。" },
  { label: "不可恢复错误", input: "问号运算符与提前返回", rule: "panic表示当前契约已被破坏或程序无法继续，不应用于普通输入、网络超时或文件缺失", evidence: "不可恢复错误的边界测试与结果记录", invariant: "panic表示当前契约已被破坏或程序无法继续，不应用于普通输入、网络超时或文件缺失；库边界尤其应让调用者决定恢复策略。" },
  { label: "自定义错误与 Error Trait", input: "不可恢复错误", rule: "枚举错误保留失败类别与源错误，Display面向人，Error source形成因果链", evidence: "自定义错误与 Error Trait的边界测试与结果记录", invariant: "枚举错误保留失败类别与源错误，Display面向人，Error source形成因果链；边界层再决定日志、退出码和用户消息。" },
];

export function MrsErrorHandlingModelLab() {
  return <MasteringRustOfficialLab title="错误处理：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsErrorHandlingBoundaryLab() {
  return <MasteringRustOfficialLab title="错误处理：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsErrorHandlingEvidenceLab() {
  return <MasteringRustOfficialLab title="错误处理：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
