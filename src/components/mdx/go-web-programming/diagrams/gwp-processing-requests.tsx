import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "Query", input: "URL查询字符串", boundary: "Request.URL.Query", output: "多值参数", invariant: "缺失、空值和重复键分别处理。" },
  { label: "Form", input: "urlencoded或multipart body", boundary: "ParseForm/ParseMultipartForm", output: "Form与PostForm", invariant: "先限制body大小，再触发解析。" },
  { label: "Write", input: "状态、header和数据", boundary: "ResponseWriter", output: "HTTP响应", invariant: "首次Write后状态已经提交。" },
  { label: "Cookie", input: "Set-Cookie或Cookie header", boundary: "cookie编码与验证", output: "客户端状态", invariant: "敏感值需签名并设置安全属性。" },
];
export function GwpRequestLab(){return <GoWebOfficialLab title="Request处理矩阵" caption="查询、表单与multipart走不同解析路径。" cases={cases}/>;}
export function GwpFormLab(){return <GoWebOfficialLab title="表单解析边界" caption="比较Form、PostForm和MultipartForm的来源与容量。" cases={cases} tone="amber" initial={1}/>;}
export function GwpCookieLab(){return <GoWebOfficialLab title="Cookie与Flash消息" caption="一次性消息依赖写入、读取和失效协议。" cases={cases} tone="rose" initial={3}/>;}
