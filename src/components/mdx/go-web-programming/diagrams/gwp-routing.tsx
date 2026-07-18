import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "Listen", input: "地址与Handler", boundary: "http.Server", output: "监听socket", invariant: "启动失败必须返回，不能静默退出。" },
  { label: "Mux", input: "method、host与path", boundary: "ServeMux匹配", output: "选定handler", invariant: "最具体模式胜出并有明确fallback。" },
  { label: "Handler", input: "Request与ResponseWriter", boundary: "ServeHTTP契约", output: "状态、header与body", invariant: "一次请求只形成一条响应提交路径。" },
  { label: "HTTP/2", input: "TLS与协议协商", boundary: "net/http传输层", output: "复用连接上的stream", invariant: "handler语义不依赖具体HTTP版本。" },
];
export function GwpServerLab(){return <GoWebOfficialLab title="net/http服务链" caption="从监听到handler，定位每个失败边界。" cases={cases}/>;}
export function GwpHandlerLab(){return <GoWebOfficialLab title="Handler契约" caption="接口与函数适配器共享同一个ServeHTTP边界。" cases={cases} tone="amber" initial={2}/>;}
export function GwpMuxLab(){return <GoWebOfficialLab title="Multiplexer匹配" caption="路径模式只负责选择处理器，不负责业务。" cases={cases} tone="emerald" initial={1}/>;}
