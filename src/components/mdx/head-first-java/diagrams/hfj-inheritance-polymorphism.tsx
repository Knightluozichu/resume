/**
 * <HfjInheritancePolymorphismDiagram>：继承与多态图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function HfjInheritancePolymorphismDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="继承与多态图解"
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
            继承与多态——IS-A 关系与动态绑定
          </text>

          {/* 父类 */}
          <rect
            x="270"
            y="48"
            width="200"
            height="90"
            rx="10"
            fill="var(--text-primary)"
            fillOpacity="0.08"
            stroke="var(--text-primary)"
            strokeWidth="1.5"
          />
          <text
            x="370"
            y="68"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Animal（父类）
          </text>
          <text x="285" y="86" fontSize="11" fill="var(--text-secondary)">
            String name;
          </text>
          <text x="285" y="100" fontSize="11" fill="var(--text-secondary)">
            void eat() &#123;...&#125;
          </text>
          <text x="285" y="114" fontSize="11" fill="var(--text-secondary)">
            void makeSound() &#123;...&#125;
          </text>
          <text x="285" y="128" fontSize="11" fill="var(--text-secondary)">
            abstract void move();
          </text>

          {/* 继承箭头 */}
          <text
            x="200"
            y="172"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            extends
          </text>
          <text
            x="200"
            y="186"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &uarr;
          </text>
          <text
            x="370"
            y="172"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            extends
          </text>
          <text
            x="370"
            y="186"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &uarr;
          </text>
          <text
            x="540"
            y="172"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            extends
          </text>
          <text
            x="540"
            y="186"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &uarr;
          </text>

          {/* 子类 */}
          <rect
            x="55"
            y="196"
            width="190"
            height="90"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="150"
            y="216"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            Dog extends Animal
          </text>
          <text x="68" y="234" fontSize="11" fill="var(--text-secondary)">
            &#47;&#47; 继承 name, eat()
          </text>
          <text x="68" y="248" fontSize="11" fill="var(--text-secondary)">
            void makeSound() &#123;
          </text>
          <text x="68" y="262" fontSize="11" fill="var(--text-secondary)">
            {" "}
            &#47;&#47; 重写: 汪汪
          </text>
          <text x="68" y="276" fontSize="11" fill="var(--text-secondary)">
            &#125;
          </text>

          <rect
            x="275"
            y="196"
            width="190"
            height="90"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="370"
            y="216"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            Cat extends Animal
          </text>
          <text x="288" y="234" fontSize="11" fill="var(--text-secondary)">
            &#47;&#47; 继承 name, eat()
          </text>
          <text x="288" y="248" fontSize="11" fill="var(--text-secondary)">
            void makeSound() &#123;
          </text>
          <text x="288" y="262" fontSize="11" fill="var(--text-secondary)">
            {" "}
            &#47;&#47; 重写: 喵喵
          </text>
          <text x="288" y="276" fontSize="11" fill="var(--text-secondary)">
            &#125;
          </text>

          <rect
            x="495"
            y="196"
            width="190"
            height="90"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="590"
            y="216"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--danger)"
          >
            Wolf extends Animal
          </text>
          <text x="508" y="234" fontSize="11" fill="var(--text-secondary)">
            &#47;&#47; 继承 name, eat()
          </text>
          <text x="508" y="248" fontSize="11" fill="var(--text-secondary)">
            void makeSound() &#123;
          </text>
          <text x="508" y="262" fontSize="11" fill="var(--text-secondary)">
            {" "}
            &#47;&#47; 重写: 嗷呜
          </text>
          <text x="508" y="276" fontSize="11" fill="var(--text-secondary)">
            &#125;
          </text>

          {/* 多态 */}
          <text
            x={VIEW_W / 2}
            y="318"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            多态——父类引用指向子类对象，运行时动态绑定
          </text>

          <rect
            x="30"
            y="332"
            width="340"
            height="170"
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.04"
            stroke="var(--warning)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="200"
            y="352"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            多态的核心用法
          </text>
          <text x="45" y="372" fontSize="11" fill="var(--text-secondary)">
            Animal a1 = new Dog();
          </text>
          <text x="45" y="388" fontSize="11" fill="var(--text-secondary)">
            Animal a2 = new Cat();
          </text>
          <text x="45" y="404" fontSize="11" fill="var(--text-secondary)">
            Animal a3 = new Wolf();
          </text>
          <text x="45" y="426" fontSize="11" fill="var(--text-secondary)">
            a1.makeSound(); // &rarr; &quot;汪汪&quot;
          </text>
          <text x="45" y="442" fontSize="11" fill="var(--text-secondary)">
            a2.makeSound(); // &rarr; &quot;喵喵&quot;
          </text>
          <text x="45" y="458" fontSize="11" fill="var(--text-secondary)">
            a3.makeSound(); // &rarr; &quot;嗷呜&quot;
          </text>
          <text x="45" y="478" fontSize="11" fill="var(--text-secondary)">
            编译时类型 Animal, 运行时类型各不同
          </text>
          <text x="45" y="494" fontSize="11" fill="var(--text-secondary)">
            JVM 根据实际对象调用对应方法
          </text>

          <rect
            x="390"
            y="332"
            width="320"
            height="170"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="550"
            y="352"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            IS-A 测试与规则
          </text>
          <text x="405" y="372" fontSize="11" fill="var(--text-secondary)">
            Dog IS-A Animal &rarr; true
          </text>
          <text x="405" y="388" fontSize="11" fill="var(--text-secondary)">
            Cat IS-A Animal &rarr; true
          </text>
          <text x="405" y="404" fontSize="11" fill="var(--text-secondary)">
            Wolf IS-A Animal &rarr; true
          </text>
          <text x="405" y="426" fontSize="11" fill="var(--text-secondary)">
            Animal a = new Dog(); // 向上转型(隐式)
          </text>
          <text x="405" y="442" fontSize="11" fill="var(--text-secondary)">
            Dog d = (Dog) a; // 向下转型(显式)
          </text>
          <text x="405" y="462" fontSize="11" fill="var(--text-secondary)">
            private 成员不继承
          </text>
          <text x="405" y="478" fontSize="11" fill="var(--text-secondary)">
            构造器不继承, 但子类构造器先调 super()
          </text>
          <text x="405" y="494" fontSize="11" fill="var(--text-secondary)">
            重写方法不能缩小访问权限
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        继承与多态——子类extends父类复用代码，父类引用指向子类对象实现运行时动态绑定
      </figcaption>
    </figure>
  );
}
