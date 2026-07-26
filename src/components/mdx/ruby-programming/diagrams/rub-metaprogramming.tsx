/**
 * <RubMetaprogrammingDiagram>：Ruby 元编程——运行时操作类与对象。
 *
 * 展示动态方法定义、method_missing、open class、define_method。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function RubMetaprogrammingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Ruby 元编程：Open Class 重新打开类、define_method 动态定义方法、method_missing 捕获未定义调用、send 运行时调用。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            Ruby 元编程：运行时操控代码
          </text>
          <text
            x={VIEW_W / 2}
            y={46}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            Open Class · define_method · method_missing · send · 鸭子类型
          </text>

          {/* 四象限 */}
          {/* Open Class */}
          <rect
            x={32}
            y={68}
            width={320}
            height={92}
            rx="8"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text x={44} y={88} fontSize="12" fontWeight="700" fill={accent}>
            Open Class（打开类）
          </text>
          <text x={44} y={108} fontSize="11" fill={primary}>
            class String
          </text>
          <text x={44} y={124} fontSize="11" fill={primary}>
            {" "}
            def shout; upcase + &quot;!&quot; ; end
          </text>
          <text x={44} y={140} fontSize="11" fill={primary}>
            end
          </text>
          <text x={44} y={156} fontSize="11" fill={secondary}>
            # 重新打开 String 加方法（随时可加）
          </text>

          {/* define_method */}
          <rect
            x={368}
            y={68}
            width={320}
            height={92}
            rx="8"
            fill={success}
            fillOpacity="0.06"
            stroke={success}
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text x={380} y={88} fontSize="12" fontWeight="700" fill={success}>
            define_method（动态方法）
          </text>
          <text
            x={380}
            y={108}
            fontSize="11"
            fill={primary}
          >{`[:name, :age, :email].each do |m|`}</text>
          <text x={380} y={124} fontSize="11" fill={primary}>
            {" "}
            define_method(m) &#123;
            instance_var_get(&quot;@#&#123;m&#125;&quot;) &#125;
          </text>
          <text x={380} y={140} fontSize="11" fill={primary}>
            end
          </text>
          <text x={380} y={156} fontSize="11" fill={secondary}>
            # 批量生成 getter，无需手写
          </text>

          {/* method_missing */}
          <rect
            x={32}
            y={172}
            width={320}
            height={100}
            rx="8"
            fill={warning}
            fillOpacity="0.06"
            stroke={warning}
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text x={44} y={192} fontSize="12" fontWeight="700" fill={warning}>
            method_missing（幽灵方法）
          </text>
          <text x={44} y={212} fontSize="11" fill={primary}>
            def method_missing(name, *args)
          </text>
          <text x={44} y={228} fontSize="11" fill={primary}>
            {" "}
            if name =~ /^find_by_(.+)$/
          </text>
          <text x={44} y={244} fontSize="11" fill={primary}>
            {" "}
            where($1 =&gt; args[0])
          </text>
          <text x={44} y={260} fontSize="11" fill={primary}>
            {" "}
            else super; end
          </text>
          <text x={44} y={266} fontSize="11" fill={secondary}>
            # find_by_name(&quot;Bob&quot;) 自动生效
          </text>

          {/* send */}
          <rect
            x={368}
            y={172}
            width={320}
            height={100}
            rx="8"
            fill={danger}
            fillOpacity="0.06"
            stroke={danger}
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text x={380} y={192} fontSize="12" fontWeight="700" fill={danger}>
            send / public_send（动态调用）
          </text>
          <text x={380} y={212} fontSize="11" fill={primary}>
            method = :upcase
          </text>
          <text x={380} y={228} fontSize="11" fill={primary}>
            &quot;hello&quot;.send(method) # HELLO
          </text>
          <text x={380} y={244} fontSize="11" fill={primary}>
            obj.send(:private_method)
          </text>
          <text x={380} y={260} fontSize="11" fill={primary}>
            public_send 不调 private
          </text>
          <text x={380} y={266} fontSize="11" fill={secondary}>
            # 运行时决定调什么方法
          </text>

          {/* 底部：元编程应用 */}
          <line
            x1={32}
            y1={288}
            x2={VIEW_W - 32}
            y2={288}
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          <text
            x={VIEW_W / 2}
            y={310}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            元编程的实际应用
          </text>

          <rect
            x={40}
            y={322}
            width={156}
            height={60}
            rx="6"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text
            x={118}
            y={342}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={primary}
          >
            Rails ActiveRecord
          </text>
          <text
            x={118}
            y={360}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            find_by_name 等
          </text>
          <text
            x={118}
            y={374}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            动态生成
          </text>

          <rect
            x={206}
            y={322}
            width={156}
            height={60}
            rx="6"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text
            x={284}
            y={342}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={primary}
          >
            attr_accessor
          </text>
          <text
            x={284}
            y={360}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            define_method
          </text>
          <text
            x={284}
            y={374}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            生成读写器
          </text>

          <rect
            x={372}
            y={322}
            width={156}
            height={60}
            rx="6"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text
            x={450}
            y={342}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={primary}
          >
            DSL 构造
          </text>
          <text
            x={450}
            y={360}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            instance_exec
          </text>
          <text
            x={450}
            y={374}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            Rakefile/RSpec
          </text>

          <rect
            x={538}
            y={322}
            width={150}
            height={60}
            rx="6"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text
            x={613}
            y={342}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={primary}
          >
            猴子补丁
          </text>
          <text
            x={613}
            y={360}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            Open Class
          </text>
          <text
            x={613}
            y={374}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            修改内置类
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Ruby 元编程让代码在运行时动态生成和修改——Rails 的优雅来自 method_missing
        和 define_method。
      </figcaption>
    </figure>
  );
}
