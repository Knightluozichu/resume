"use client";

export function SqtFunctionsDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="SQL函数与数据处理">
      <defs>
        <linearGradient id="sqt-fn-text" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="sqt-fn-num" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="sqt-fn-date" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="sqt-fn-conv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">SQL 函数分类与应用</text>

      {/* 文本函数 */}
      <rect x="30" y="50" width="360" height="200" rx="10" fill="url(#sqt-fn-text)" opacity="0.95" />
      <text x="210" y="73" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">文本处理函数</text>
      <line x1="50" y1="83" x2="370" y2="83" stroke="#fff" strokeWidth="1" opacity="0.3" />
      <text x="50" y="105" fontSize="11" fill="#dbeafe" fontFamily="monospace">UPPER(s) / LOWER(s)  大小写转换</text>
      <text x="50" y="125" fontSize="11" fill="#dbeafe" fontFamily="monospace">LENGTH(s) / CHAR_LENGTH(s)  长度</text>
      <text x="50" y="145" fontSize="11" fill="#dbeafe" fontFamily="monospace">SUBSTRING(s, pos, len)  截取</text>
      <text x="50" y="165" fontSize="11" fill="#dbeafe" fontFamily="monospace">TRIM(s) / LTRIM / RTRIM  去空格</text>
      <text x="50" y="185" fontSize="11" fill="#dbeafe" fontFamily="monospace">CONCAT(s1, s2, ...)  拼接</text>
      <text x="50" y="205" fontSize="11" fill="#dbeafe" fontFamily="monospace">REPLACE(s, old, new)  替换</text>
      <text x="50" y="225" fontSize="11" fill="#dbeafe" fontFamily="monospace">LEFT(s, n) / RIGHT(s, n)  取左右</text>
      <text x="50" y="245" fontSize="11" fill="#bfdbfe">场景：格式化姓名、清洗数据、生成编号</text>

      {/* 数值函数 */}
      <rect x="410" y="50" width="360" height="200" rx="10" fill="url(#sqt-fn-num)" opacity="0.95" />
      <text x="590" y="73" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">数值处理函数</text>
      <line x1="430" y1="83" x2="750" y2="83" stroke="#fff" strokeWidth="1" opacity="0.3" />
      <text x="430" y="105" fontSize="11" fill="#fef3c7" fontFamily="monospace">ROUND(n, d)  四舍五入到 d 位</text>
      <text x="430" y="125" fontSize="11" fill="#fef3c7" fontFamily="monospace">TRUNCATE(n, d)  截断到 d 位</text>
      <text x="430" y="145" fontSize="11" fill="#fef3c7" fontFamily="monospace">CEIL(n) / FLOOR(n)  向上/向下取整</text>
      <text x="430" y="165" fontSize="11" fill="#fef3c7" fontFamily="monospace">ABS(n)  绝对值</text>
      <text x="430" y="185" fontSize="11" fill="#fef3c7" fontFamily="monospace">MOD(n, m)  取模（求余）</text>
      <text x="430" y="205" fontSize="11" fill="#fef3c7" fontFamily="monospace">POWER(n, m)  幂运算</text>
      <text x="430" y="225" fontSize="11" fill="#fef3c7" fontFamily="monospace">RAND()  随机数 [0, 1)</text>
      <text x="430" y="245" fontSize="11" fill="#fde68a">场景：金额计算、统计精度、分页偏移</text>

      {/* 日期时间函数 */}
      <rect x="30" y="270" width="360" height="200" rx="10" fill="url(#sqt-fn-date)" opacity="0.95" />
      <text x="210" y="293" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">日期时间函数</text>
      <line x1="50" y1="303" x2="370" y2="303" stroke="#fff" strokeWidth="1" opacity="0.3" />
      <text x="50" y="325" fontSize="11" fill="#d1fae5" fontFamily="monospace">NOW() / CURDATE() / CURTIME()</text>
      <text x="50" y="345" fontSize="11" fill="#d1fae5" fontFamily="monospace">YEAR(d) / MONTH(d) / DAY(d)</text>
      <text x="50" y="365" fontSize="11" fill="#d1fae5" fontFamily="monospace">DATE_FORMAT(d, fmt)  格式化</text>
      <text x="50" y="385" fontSize="11" fill="#d1fae5" fontFamily="monospace">DATEDIFF(d1, d2)  日期差</text>
      <text x="50" y="405" fontSize="11" fill="#d1fae5" fontFamily="monospace">DATE_ADD(d, INTERVAL n UNIT)</text>
      <text x="50" y="425" fontSize="11" fill="#d1fae5" fontFamily="monospace">DATE_SUB(d, INTERVAL n UNIT)</text>
      <text x="50" y="445" fontSize="11" fill="#d1fae5" fontFamily="monospace">STR_TO_DATE(s, fmt)  字符串转日期</text>
      <text x="50" y="465" fontSize="11" fill="#a7f3d0">场景：订单统计、年龄计算、过期判断</text>

      {/* 类型转换函数 */}
      <rect x="410" y="270" width="360" height="200" rx="10" fill="url(#sqt-fn-conv)" opacity="0.95" />
      <text x="590" y="293" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">类型转换与系统函数</text>
      <line x1="430" y1="303" x2="750" y2="303" stroke="#fff" strokeWidth="1" opacity="0.3" />
      <text x="430" y="325" fontSize="11" fill="#ede9fe" fontFamily="monospace">CAST(expr AS type)  类型转换</text>
      <text x="430" y="345" fontSize="11" fill="#ede9fe" fontFamily="monospace">CONVERT(expr, type)  同上</text>
      <text x="430" y="365" fontSize="11" fill="#ede9fe" fontFamily="monospace">COALESCE(a, b, ...)  返回首个非NULL</text>
      <text x="430" y="385" fontSize="11" fill="#ede9fe" fontFamily="monospace">NULLIF(a, b)  相等返回NULL</text>
      <text x="430" y="405" fontSize="11" fill="#ede9fe" fontFamily="monospace">IFNULL(a, b)  a为NULL则返回b</text>
      <text x="430" y="425" fontSize="11" fill="#ede9fe" fontFamily="monospace">IF(cond, a, b)  条件表达式</text>
      <text x="430" y="445" fontSize="11" fill="#ddd6fe" fontFamily="monospace">CASE WHEN ... THEN ... END</text>
      <text x="430" y="465" fontSize="11" fill="#c4b5fd">场景：NULL处理、条件逻辑、格式统一</text>
    </svg>
  );
}
