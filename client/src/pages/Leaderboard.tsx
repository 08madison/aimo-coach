import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Flame, Star, TrendingUp, Medal } from 'lucide-react';

const LEADERBOARD = [
  { rank: 1, name: '李明远', grade: '高二', score: 2840, streak: 42, solved: 186, badge: '竞赛达人' },
  { rank: 2, name: '王思琪', grade: '高一', score: 2710, streak: 35, solved: 164, badge: '数论高手' },
  { rank: 3, name: '张浩然', grade: '初三', score: 2650, streak: 28, solved: 152, badge: '几何天才' },
  { rank: 4, name: '陈雨桐', grade: '高二', score: 2480, streak: 21, solved: 143, badge: '' },
  { rank: 5, name: '刘子轩', grade: '高一', score: 2320, streak: 19, solved: 128, badge: '' },
  { rank: 6, name: '赵晓雪', grade: '初二', score: 2190, streak: 15, solved: 115, badge: '' },
  { rank: 7, name: '孙宇飞', grade: '高三', score: 2050, streak: 12, solved: 108, badge: '' },
  { rank: 8, name: '周梦琳', grade: '初三', score: 1980, streak: 10, solved: 97, badge: '' },
  { rank: 9, name: '吴嘉豪', grade: '高一', score: 1870, streak: 8, solved: 89, badge: '' },
  { rank: 10, name: '郑佳欣', grade: '初二', score: 1760, streak: 7, solved: 82, badge: '' },
];

const WEEKLY_CHALLENGES = [
  { title: '数论周挑战', desc: '完成 10 道数论题', progress: 7, total: 10, reward: '+500分' },
  { title: '连续打卡', desc: '连续 7 天练习', progress: 4, total: 7, reward: '专属徽章' },
  { title: '几何专项', desc: '几何题正确率达 80%', progress: 65, total: 80, reward: '+300分', isPercent: true },
];

const rankColors = ['text-amber-500', 'text-slate-400', 'text-amber-700'];
const rankBgs = ['bg-amber-50 border-amber-200', 'bg-slate-50 border-slate-200', 'bg-amber-50/60 border-amber-100'];

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-20 pb-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">
            <Trophy className="w-3.5 h-3.5 mr-1.5 inline" />
            本周排行榜
          </Badge>
          <h1 className="text-3xl font-bold text-foreground">全国竞赛生排名</h1>
          <p className="text-muted-foreground mt-2">每周一更新 · 基于练习得分和连续打卡天数</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main leaderboard */}
          <div className="space-y-3">
            {/* Top 3 podium */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((user, i) => {
                const actualRank = i === 0 ? 2 : i === 1 ? 1 : 3;
                return (
                  <Card
                    key={user.rank}
                    className={`border-2 text-center ${rankBgs[actualRank - 1]} ${actualRank === 1 ? 'scale-[1.03] shadow-lg' : ''}`}
                  >
                    <CardContent className="pt-5 pb-4">
                      <div className={`text-3xl font-bold mb-1 ${rankColors[actualRank - 1]}`}>
                        {actualRank === 1 ? '🥇' : actualRank === 2 ? '🥈' : '🥉'}
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-current flex items-center justify-center mx-auto mb-2 text-lg font-bold text-foreground">
                        {user.name[0]}
                      </div>
                      <div className="font-semibold text-sm text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">{user.grade}</div>
                      <div className={`text-xl font-bold ${rankColors[actualRank - 1]}`}>{user.score.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">积分</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Rest of leaderboard */}
            <Card className="border-border bg-white shadow-sm overflow-hidden">
              <CardHeader className="pb-2 pt-4 px-4 border-b border-border/50">
                <CardTitle className="text-sm text-muted-foreground font-medium">完整排名</CardTitle>
              </CardHeader>
              <div className="divide-y divide-border/50">
                {LEADERBOARD.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center gap-4 px-4 py-3 hover:bg-gray-50/80 transition-colors ${
                      user.rank <= 3 ? 'bg-gray-50/40' : ''
                    }`}
                  >
                    <div className={`w-7 text-center font-bold text-sm ${
                      user.rank <= 3 ? rankColors[user.rank - 1] : 'text-muted-foreground'
                    }`}>
                      {user.rank}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                      {user.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-foreground">{user.name}</span>
                        {user.badge && (
                          <Badge className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0">
                            {user.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{user.grade} · {user.solved} 题</div>
                    </div>
                    <div className="flex items-center gap-1 text-orange-500 text-xs">
                      <Flame size={12} />
                      <span>{user.streak}天</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm text-foreground">{user.score.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">积分</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* My stats (mock) */}
            <Card className="border-border bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp size={15} className="text-primary" />
                  我的本周数据
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center py-3 bg-primary/5 rounded-xl">
                  <div className="text-3xl font-bold text-primary mb-1">1,240</div>
                  <div className="text-xs text-muted-foreground">本周积分</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: '排名', value: '#23' },
                    { label: '已解题', value: '31' },
                    { label: '连续', value: '5天' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-lg p-2">
                      <div className="font-bold text-sm text-foreground">{value}</div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly challenges */}
            <Card className="border-border bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Star size={15} className="text-amber-500" />
                  本周挑战任务
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {WEEKLY_CHALLENGES.map(({ title, desc, progress, total, reward, isPercent }) => (
                  <div key={title}>
                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <div className="text-sm font-medium text-foreground">{title}</div>
                        <div className="text-xs text-muted-foreground">{desc}</div>
                      </div>
                      <Badge className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0 ml-2">
                        {reward}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (progress / total) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {isPercent ? `${progress}%` : `${progress}/${total}`}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="border-border bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Medal size={15} className="text-primary" />
                  成就徽章
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { emoji: '🔥', label: '7天连击', unlocked: true },
                    { emoji: '🧮', label: '数论达人', unlocked: true },
                    { emoji: '📐', label: '几何高手', unlocked: false },
                    { emoji: '🏆', label: '竞赛冠军', unlocked: false },
                    { emoji: '⚡', label: '速解高手', unlocked: true },
                    { emoji: '🌟', label: '满分答题', unlocked: false },
                    { emoji: '📚', label: '百题学者', unlocked: false },
                    { emoji: '🎯', label: '精准射手', unlocked: true },
                  ].map(({ emoji, label, unlocked }) => (
                    <div
                      key={label}
                      className={`text-center p-2 rounded-xl ${
                        unlocked ? 'bg-primary/5' : 'bg-gray-50 opacity-40'
                      }`}
                      title={label}
                    >
                      <div className="text-2xl mb-1">{emoji}</div>
                      <div className="text-[9px] text-muted-foreground leading-tight">{label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
