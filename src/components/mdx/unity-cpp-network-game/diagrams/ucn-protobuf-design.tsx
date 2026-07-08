/**
 * <UcnProtobufDesignDiagram>：Protobuf 协议设计——序列化与消息结构图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function UcnProtobufDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Protobuf 协议设计——序列化流程与消息结构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Protobuf 消息定义与序列化流程
          </text>

          {/* 左侧：Proto 定义 */}
          <rect x="30" y="50" width="320" height="190" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="190" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">Proto Schema 定义</text>

          <text x="50" y="100" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">syntax = "proto3";</text>
          <text x="50" y="118" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">message CastSkillReq &lbrace;</text>
          <text x="65" y="136" fontSize="10" fill="var(--accent)" fontFamily="monospace">int32 skill_id  = 1;</text>
          <text x="65" y="154" fontSize="10" fill="var(--accent)" fontFamily="monospace">int32 target_id = 2;</text>
          <text x="65" y="172" fontSize="10" fill="var(--accent)" fontFamily="monospace">Vec3  position   = 3;</text>
          <text x="50" y="190" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>
          <text x="50" y="212" fontSize="9" fill="var(--text-tertiary)">字段号 1-15 占 1 字节，16+ 占 2 字节</text>
          <text x="50" y="226" fontSize="9" fill="var(--text-tertiary)">常用字段放前面，节省编码空间</text>

          {/* 中间箭头 */}
          <text x="375" y="110" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>
          <text x="375" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">protoc</text>
          <text x="375" y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">编译</text>

          <text x="375" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&larr;</text>
          <text x="375" y="200" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">反序列化</text>

          {/* 右侧上：序列化后的二进制 */}
          <rect x="390" y="50" width="320" height="90" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="550" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">序列化后（二进制）</text>

          <rect x="410" y="86" width="60" height="24" rx="3" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="440" y="102" textAnchor="middle" fontSize="8" fill="var(--accent)">tag=1</text>
          <rect x="475" y="86" width="45" height="24" rx="3" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="497" y="102" textAnchor="middle" fontSize="8" fill="var(--accent)">varint</text>
          <rect x="525" y="86" width="60" height="24" rx="3" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="555" y="102" textAnchor="middle" fontSize="8" fill="var(--accent)">tag=2</text>
          <rect x="590" y="86" width="45" height="24" rx="3" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="612" y="102" textAnchor="middle" fontSize="8" fill="var(--accent)">varint</text>
          <rect x="640" y="86" width="55" height="24" rx="3" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="667" y="102" textAnchor="middle" fontSize="8" fill="var(--accent)">tag=3</text>

          <text x="550" y="126" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">key = (field_num &lt;&lt; 3) | wire_type</text>
          <text x="550" y="138" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">varint 变长编码：小数字占 1 字节</text>

          {/* 右侧下：目标语言结构体 */}
          <rect x="390" y="155" width="320" height="85" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="550" y="178" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">生成的 C++ / C# 类</text>
          <text x="410" y="200" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">class CastSkillReq &lbrace;</text>
          <text x="425" y="216" fontSize="10" fill="var(--warning)" fontFamily="monospace">int32 skill_id() const;</text>
          <text x="425" y="232" fontSize="10" fill="var(--warning)" fontFamily="monospace">int32 target_id() const;</text>
          <text x="410" y="248" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>

          {/* 底部：封包格式 */}
          <rect x="30" y="265" width="680" height="170" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">完整网络封包格式（长度前缀 + 消息号 + Protobuf 体）</text>

          <rect x="60" y="305" width="120" height="50" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="120" y="325" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">消息长度</text>
          <text x="120" y="342" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">2 字节 uint16</text>

          <rect x="195" y="305" width="120" height="50" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="255" y="325" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">消息号 MsgId</text>
          <text x="255" y="342" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">2 字节 uint16</text>

          <rect x="330" y="305" width="350" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="505" y="325" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Protobuf 序列化数据</text>
          <text x="505" y="342" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">变长 · 紧凑二进制</text>

          <text x="370" y="385" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">收包：读长度 → 读 MsgId → 按 MsgId 找到 message 类型 → Protobuf 反序列化</text>
          <text x="370" y="402" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">发包：Protobuf 序列化 → 填 MsgId → 计算总长度填入头部 → send()</text>
          <text x="370" y="420" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">版本兼容：proto3 默认 optional，新增字段用新 field_num，旧端忽略未知字段</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Protobuf 协议设计——从 Schema 定义到二进制序列化再到网络封包的完整流程
      </figcaption>
    </figure>
  );
}
