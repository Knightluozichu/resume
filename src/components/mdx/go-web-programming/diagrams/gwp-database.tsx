import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "Memory", input: "结构体、切片与map", boundary: "进程内仓库", output: "低延迟易失状态", invariant: "并发访问必须同步且重启会丢失。" },
  { label: "File", input: "CSV或gob记录", boundary: "文件编码与原子替换", output: "本地持久数据", invariant: "部分写入不能覆盖最后一份好数据。" },
  { label: "SQL", input: "参数化查询与事务", boundary: "database/sql", output: "关系记录", invariant: "Rows、Stmt和Tx生命周期必须收敛。" },
  { label: "Mapper", input: "领域对象与关系行", boundary: "手写或映射层", output: "CRUD对象", invariant: "便利映射不能隐藏查询数量和事务边界。" },
];
export function GwpStorageChoiceLab(){return <GoWebOfficialLab title="存储介质选择" caption="容量、持久性、并发与查询决定存储位置。" cases={cases}/>;}
export function GwpCrudLab(){return <GoWebOfficialLab title="CRUD证据链" caption="创建、读取、更新、删除都要保留错误与受影响行数。" cases={cases} tone="amber" initial={2}/>;}
export function GwpMapperLab(){return <GoWebOfficialLab title="关系与映射边界" caption="对象关系映射必须显式暴露事务和查询成本。" cases={cases} tone="emerald" initial={3}/>;}
