import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "List", input: "GET /", boundary: "mux与index handler", output: "帖子列表HTML", invariant: "查询、渲染和写响应可分别失败。" },
  { label: "Login", input: "用户凭据", boundary: "cookie访问控制", output: "会话身份", invariant: "cookie只携带最小身份并设置属性。" },
  { label: "Thread", input: "创建主题或回复", boundary: "handler与数据模型", output: "持久化记录", invariant: "授权检查先于状态修改。" },
  { label: "Static", input: "CSS、JS和图片路径", boundary: "静态文件handler", output: "带类型的文件响应", invariant: "静态根目录不能越界。" },
];
export function GwpChitchatArchitectureLab(){return <GoWebOfficialLab title="ChitChat应用架构" caption="完整论坛把请求、模板、Cookie和PostgreSQL串成一条链。" cases={cases}/>;}
export function GwpChitchatFlowLab(){return <GoWebOfficialLab title="论坛请求流" caption="切换用例观察不同handler与数据边界。" cases={cases} tone="amber" initial={1}/>;}
export function GwpChitchatDataLab(){return <GoWebOfficialLab title="论坛数据模型" caption="用户、会话、主题与回复通过明确键关系连接。" cases={cases} tone="emerald" initial={2}/>;}
