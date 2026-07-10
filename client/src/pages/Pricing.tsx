import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle2, X, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { PLANS } from '@/lib/data';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = [
  {
    q: '免费版有哪些限制？',
    a: '免费版每天可以练习 3 道题，可以查看答案，但无法使用 AI 苏格拉底式引导和详细评分功能。升级到 Pro 后即可解锁全部功能。',
  },
  {
    q: '可以随时取消订阅吗？',
    a: '是的，你可以随时取消订阅，取消后当前计费周期结束前仍可正常使用。我们不设任何违约金。',
  },
  {
    q: 'AI 教练的回答准确吗？',
    a: 'AI 教练基于顶尖数学竞赛教师的教学经验训练，题库中的所有题目和解析均经过人工审核。对于疑难问题，精英版用户还可以直接向名师提问。',
  },
  {
    q: '适合哪些竞赛备考？',
    a: '我们的题库覆盖 AMC 8/10/12、AIME、USAMO、全国联赛（CMO）、省级联赛等各级竞赛，按难度分级，适合不同目标的学生。',
  },
  {
    q: '家长可以查看学习进度吗？',
    a: '可以。Pro 及以上版本提供家长监控面板，可以查看孩子的练习记录、得分趋势和知识点掌握情况。',
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = (planId: string) => {
    if (planId === 'free') {
      toast.success('已开启免费体验！');
      return;
    }
    toast.info('订阅功能即将上线，敬请期待！', {
      description: '目前可免费体验基础功能',
    });
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      {/* Math decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {['∑', 'π', '∞', '∫'].map((sym, i) => (
          <span
            key={i}
            className="math-bg-symbol"
            style={{
              top: `${15 + i * 22}%`,
              left: `${i % 2 === 0 ? '3%' : '92%'}`,
              fontSize: '5rem',
              opacity: 0.03,
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-4 px-3 py-1">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
            订阅计划
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            选择适合你的
            <span className="gradient-text">学习计划</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            从免费体验到精英冲刺，每个阶段都有专属方案。
            所有付费计划均提供 7 天无理由退款。
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                billing === 'monthly'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              按月付费
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billing === 'yearly'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              按年付费
              <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">
                省 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {PLANS.map((plan) => {
            const price = billing === 'yearly' && plan.price > 0
              ? Math.floor(plan.price * 0.8)
              : plan.price;
            const isHighlight = plan.highlight;

            return (
              <Card
                key={plan.id}
                className={`relative border-2 transition-all duration-200 ${
                  isHighlight
                    ? 'border-primary shadow-xl shadow-primary/10 scale-[1.02]'
                    : 'border-border hover:border-primary/40 hover:shadow-md'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className={`px-3 py-1 text-xs font-semibold shadow-sm ${
                      isHighlight
                        ? 'bg-primary text-white'
                        : 'bg-amber-500 text-white'
                    }`}>
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4 pt-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="flex items-end gap-1">
                    {plan.price === 0 ? (
                      <span className="text-4xl font-bold text-foreground">免费</span>
                    ) : (
                      <>
                        <span className="text-sm text-muted-foreground self-start mt-2">¥</span>
                        <span className="text-4xl font-bold text-foreground">{price}</span>
                        <span className="text-sm text-muted-foreground mb-1">/{billing === 'yearly' ? '月·年付' : '月'}</span>
                      </>
                    )}
                  </div>
                  {billing === 'yearly' && plan.price > 0 && (
                    <p className="text-xs text-muted-foreground line-through">原价 ¥{plan.price}/月</p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full gap-2 ${
                      isHighlight
                        ? 'bg-primary hover:bg-primary/90 text-white shadow-sm'
                        : plan.id === 'free'
                        ? 'bg-white border border-border text-foreground hover:bg-accent'
                        : 'bg-foreground hover:bg-foreground/90 text-white'
                    }`}
                    variant={plan.id === 'free' ? 'outline' : 'default'}
                  >
                    {plan.id === 'free' ? '免费开始' : '立即订阅'}
                    <ArrowRight size={15} />
                  </Button>

                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature comparison table */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">功能对比</h2>
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-gray-50/80">
                  <th className="text-left p-4 font-semibold text-foreground">功能</th>
                  <th className="text-center p-4 font-semibold text-muted-foreground">免费</th>
                  <th className="text-center p-4 font-semibold text-primary">Pro</th>
                  <th className="text-center p-4 font-semibold text-foreground">精英</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['每日练习题数', '3道', '无限', '无限'],
                  ['AI 苏格拉底引导', false, true, true],
                  ['智能打分点评', false, true, true],
                  ['个性化学习路径', false, true, true],
                  ['错题本', false, true, true],
                  ['模拟考试', false, true, true],
                  ['名师直播答疑', false, false, true],
                  ['一对一深度辅导', false, false, true],
                  ['IMO级别题库', false, false, true],
                ].map(([feature, free, pro, elite], i) => (
                  <tr key={i} className={`border-b border-border/50 ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                    <td className="p-4 text-foreground">{feature}</td>
                    <td className="p-4 text-center">
                      {typeof free === 'boolean'
                        ? free ? <CheckCircle2 size={16} className="text-emerald-500 mx-auto" /> : <X size={16} className="text-muted-foreground/40 mx-auto" />
                        : <span className="text-muted-foreground">{free}</span>
                      }
                    </td>
                    <td className="p-4 text-center bg-primary/3">
                      {typeof pro === 'boolean'
                        ? pro ? <CheckCircle2 size={16} className="text-emerald-500 mx-auto" /> : <X size={16} className="text-muted-foreground/40 mx-auto" />
                        : <span className="text-primary font-medium">{pro}</span>
                      }
                    </td>
                    <td className="p-4 text-center">
                      {typeof elite === 'boolean'
                        ? elite ? <CheckCircle2 size={16} className="text-emerald-500 mx-auto" /> : <X size={16} className="text-muted-foreground/40 mx-auto" />
                        : <span className="text-foreground">{elite}</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">常见问题</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ.map(({ q, a }, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white border border-border rounded-xl px-4 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-10 bg-gradient-to-br from-primary/5 via-blue-50/30 to-emerald-50/20 rounded-2xl border border-border/50">
          <h2 className="text-2xl font-bold text-foreground mb-3">还在犹豫？先免费试试</h2>
          <p className="text-muted-foreground mb-6">无需信用卡，立即体验 AI 教练的魅力</p>
          <Link href="/practice">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-md gap-2 px-8">
              免费开始练习 <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
