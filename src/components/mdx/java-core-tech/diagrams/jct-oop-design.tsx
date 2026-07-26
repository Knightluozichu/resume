/**
 * <JctOopDesignDiagram>：面向对象设计图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function JctOopDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="面向对象设计图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="28"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            面向对象设计——封装、继承、多态
          </text>

          {/* 类结构 */}
          <rect
            x="30"
            y="48"
            width="680"
            height="120"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="370"
            y="70"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--accent)"
          >
            类的结构——以 Employee 为例
          </text>

          <rect
            x="55"
            y="82"
            width="200"
            height="76"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="155"
            y="98"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            字段（封装）
          </text>
          <text x="65" y="114" fontSize="11" fill="var(--text-secondary)">
            private String name;
          </text>
          <text x="65" y="128" fontSize="11" fill="var(--text-secondary)">
            private double salary;
          </text>
          <text x="65" y="142" fontSize="11" fill="var(--text-secondary)">
            private LocalDate hireDate;
          </text>
          <text x="65" y="154" fontSize="11" fill="var(--text-secondary)">
            &#47;&#47; private = 只能本类访问
          </text>

          <rect
            x="270"
            y="82"
            width="200"
            height="76"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1"
          />
          <text
            x="370"
            y="98"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            构造器
          </text>
          <text x="280" y="114" fontSize="11" fill="var(--text-secondary)">
            public Employee(String n,
          </text>
          <text x="280" y="128" fontSize="11" fill="var(--text-secondary)">
            {" "}
            double s, int year, ...) &#123;
          </text>
          <text x="280" y="142" fontSize="11" fill="var(--text-secondary)">
            {" "}
            name = n; salary = s;
          </text>
          <text x="280" y="154" fontSize="11" fill="var(--text-secondary)">
            &#125;
          </text>

          <rect
            x="485"
            y="82"
            width="200"
            height="76"
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.08"
            stroke="var(--danger)"
            strokeWidth="1"
          />
          <text
            x="585"
            y="98"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            方法
          </text>
          <text x="495" y="114" fontSize="11" fill="var(--text-secondary)">
            public String getName() &#123;
          </text>
          <text x="495" y="128" fontSize="11" fill="var(--text-secondary)">
            {" "}
            return name;
          </text>
          <text x="495" y="142" fontSize="11" fill="var(--text-secondary)">
            &#125;
          </text>
          <text x="495" y="154" fontSize="11" fill="var(--text-secondary)">
            public void raiseSalary(double p)
          </text>

          {/* 继承体系 */}
          <text
            x={VIEW_W / 2}
            y="194"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            继承体系——extends 与 super
          </text>

          <rect
            x="270"
            y="208"
            width="200"
            height="50"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.08"
            stroke="var(--text-primary)"
            strokeWidth="1.2"
          />
          <text
            x="370"
            y="228"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Employee
          </text>
          <text
            x="370"
            y="244"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            name / salary / hireDate
          </text>

          <text
            x="200"
            y="278"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>
          <text
            x="540"
            y="278"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>

          <rect
            x="55"
            y="290"
            width="210"
            height="50"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="160"
            y="310"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            Manager extends Employee
          </text>
          <text
            x="160"
            y="326"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            bonus / setBonus / getSalary
          </text>

          <rect
            x="475"
            y="290"
            width="210"
            height="50"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="580"
            y="310"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            子类特有方法
          </text>
          <text
            x="580"
            y="326"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            super.getSalary() + bonus
          </text>

          {/* 多态 */}
          <text
            x={VIEW_W / 2}
            y="372"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            多态——动态绑定
          </text>

          <rect
            x="30"
            y="386"
            width="340"
            height="100"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text x="55" y="406" fontSize="11" fill="var(--text-secondary)">
            Employee[] staff = new Employee[2];
          </text>
          <text x="55" y="422" fontSize="11" fill="var(--text-secondary)">
            staff[0] = new Employee(&quot;Alice&quot;, 50000);
          </text>
          <text x="55" y="438" fontSize="11" fill="var(--text-secondary)">
            staff[1] = new Manager(&quot;Bob&quot;, 80000);
          </text>
          <text x="55" y="458" fontSize="11" fill="var(--text-secondary)">
            staff[0].getSalary(); // 50000
          </text>
          <text x="55" y="474" fontSize="11" fill="var(--text-secondary)">
            staff[1].getSalary(); // 80000+bonus
          </text>

          <rect
            x="390"
            y="386"
            width="320"
            height="100"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="550"
            y="406"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            多态三要素
          </text>
          <text x="405" y="424" fontSize="11" fill="var(--text-secondary)">
            1. 继承: Manager extends Employee
          </text>
          <text x="405" y="440" fontSize="11" fill="var(--text-secondary)">
            2. 重写: Manager 重写 getSalary()
          </text>
          <text x="405" y="456" fontSize="11" fill="var(--text-secondary)">
            3. 父类引用指向子类对象
          </text>
          <text x="405" y="472" fontSize="11" fill="var(--text-secondary)">
            {" "}
            运行时动态绑定实际方法
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        面向对象设计——类的封装结构、extends继承体系、动态绑定多态三要素
      </figcaption>
    </figure>
  );
}
