import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const text: RustWayCase[] = [
  { label: "Bytes", input: "任意u8序列", mechanism: "按协议保存原始编码", result: "&[u8]或Vec<u8>", invariant: "未验证前不能把任意bytes当UTF-8文本。" },
  { label: "str", input: "有效UTF-8bytes", mechanism: "借用的字符串slice", result: "按byte索引边界的文本视图", invariant: "切片端点必须位于UTF-8字符边界。" },
  { label: "char", input: "Unicode scalar value", mechanism: "decode一个标量", result: "四字节Rust值", invariant: "char不等于用户看到的grapheme cluster。" },
];
const operations: RustWayCase[] = [
  { label: "查找", input: "String与pattern", mechanism: "find、contains或chars迭代", result: "byte offset或匹配", invariant: "offset不是字符序号。" },
  { label: "修改", input: "可变String与合法文本", mechanism: "push、insert、replace_range", result: "仍为有效UTF-8", invariant: "修改点必须落在字符边界。" },
  { label: "转换", input: "bytes或数字文本", mechanism: "from_utf8、parse与format", result: "Result或新String", invariant: "编码错误和解析错误不能静默吞掉。" },
];
const collections: RustWayCase[] = [
  { label: "Vec", input: "有序同型元素", mechanism: "len/capacity与连续buffer", result: "O(1)索引、摊销push", invariant: "扩容后旧指针和引用不可继续使用。" },
  { label: "HashMap/Set", input: "Hash + Eq的key", mechanism: "哈希桶与负载因子", result: "平均O(1)查找", invariant: "key在表中时不能改变影响Hash/Eq的状态。" },
  { label: "BTreeMap/Set", input: "Ord的key", mechanism: "有序树节点", result: "O(log n)查找与范围遍历", invariant: "Ord必须与Eq一致并形成全序。" },
];
export function RswEncodingLab() { return <RustWayOfficialLab title="Bytes、str与char" caption="字符串问题先区分bytes、Unicode scalar和用户可见字符。" cases={text} tone="cyan" />; }
export function RswStringOperationLab() { return <RustWayOfficialLab title="字符串处理管线" caption="查找返回byte位置；修改必须保留UTF-8；转换应暴露失败。" cases={operations} tone="amber" />; }
export function RswCollectionChoiceLab() { return <RustWayOfficialLab title="集合选择与容量" caption="顺序、查找复杂度、key不变量和扩容行为共同决定集合。" cases={collections} tone="emerald" />; }
