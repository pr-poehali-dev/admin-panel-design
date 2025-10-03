import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColorScheme, colorSchemes } from './types';

interface TransactionsPageProps {
  onBack: () => void;
  colorScheme: ColorScheme;
}

const tabs = [
  { id: 'pending', label: 'Ожидают обработки', count: 12 },
  { id: 'completed', label: 'Завершённые', count: 48 },
  { id: 'failed', label: 'Ошибки', count: 3 },
  { id: 'info', label: 'Информация', count: null },
];

const transactionsData = {
  pending: [
    { id: 501, user: 'Иванов И. И.', amount: '5000 ₽', date: '3.10.2025 14:25', method: 'Карта' },
    { id: 502, user: 'Петрова А. А.', amount: '3200 ₽', date: '3.10.2025 13:10', method: 'СБП' },
    { id: 503, user: 'Сидоров П. К.', amount: '1500 ₽', date: '3.10.2025 12:45', method: 'Карта' },
  ],
  completed: [
    { id: 401, user: 'Кузнецова М. В.', amount: '8200 ₽', date: '2.10.2025 16:30', method: 'Карта' },
    { id: 402, user: 'Смирнов Д. Л.', amount: '12500 ₽', date: '2.10.2025 15:20', method: 'СБП' },
  ],
  failed: [
    { id: 301, user: 'Новикова Е. С.', amount: '2100 ₽', date: '3.10.2025 11:15', method: 'Карта', error: 'Недостаточно средств' },
  ]
};

export const TransactionsPage = ({ onBack, colorScheme }: TransactionsPageProps) => {
  const [activeTab, setActiveTab] = useState('pending');
  const currentScheme = colorSchemes[colorScheme];

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Icon name="LayoutDashboard" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Admin Panel</h1>
              <p className="text-xs text-sidebar-foreground/60">Управление</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-3 py-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Icon name="ArrowLeft" size={18} />
            Назад к балансам
          </Button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card/50 backdrop-blur-sm border-b border-border px-8 py-6">
          <h2 className="text-3xl font-bold text-foreground mb-1">Транзакции пополнения</h2>
          <p className="text-sm text-muted-foreground">История операций и текущие транзакции</p>
        </header>

        <div className="border-b border-border bg-card/50">
          <div className="flex gap-2 px-8 pt-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-t-lg font-medium text-sm transition-all relative ${
                  activeTab === tab.id
                    ? 'bg-card text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <Badge variant="secondary" className="ml-1 bg-primary/10 text-primary">
                      {tab.count}
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'info' ? (
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 border-0 shadow-md">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${currentScheme.gradient1} flex items-center justify-center text-white`}>
                    <Icon name="Clock" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Время обработки</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Среднее время обработки транзакции составляет 15-30 минут в рабочее время
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Минимум</p>
                        <p className="font-semibold">5 мин</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Максимум</p>
                        <p className="font-semibold">2 часа</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-md">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${currentScheme.gradient2} flex items-center justify-center text-white`}>
                    <Icon name="TrendingUp" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Статистика за месяц</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Общий объём транзакций за текущий месяц
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Сумма</p>
                        <p className="font-semibold text-lg">2.4М ₽</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Операций</p>
                        <p className="font-semibold text-lg">156</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-md">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${currentScheme.gradient3} flex items-center justify-center text-white`}>
                    <Icon name="CreditCard" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Способы оплаты</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Доступные методы пополнения баланса
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Банковская карта</span>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Активен</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">СБП</span>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Активен</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Электронные кошельки</span>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700">Недоступен</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white">
                    <Icon name="AlertCircle" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Важная информация</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Комиссия за пополнение не взимается. Минимальная сумма — 100 ₽
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-emerald-600" />
                        <span>Мгновенное зачисление для СБП</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-emerald-600" />
                        <span>Защищённые платежи</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="border-0 shadow-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border hover:bg-transparent bg-muted/30">
                    <TableHead className="font-semibold text-foreground pl-6">ID</TableHead>
                    <TableHead className="font-semibold text-foreground">Пользователь</TableHead>
                    <TableHead className="font-semibold text-foreground">Сумма</TableHead>
                    <TableHead className="font-semibold text-foreground">Дата и время</TableHead>
                    <TableHead className="font-semibold text-foreground">Метод</TableHead>
                    {activeTab === 'failed' && (
                      <TableHead className="font-semibold text-foreground pr-6">Ошибка</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(transactionsData[activeTab as keyof typeof transactionsData] || []).map((item: any) => (
                    <TableRow 
                      key={item.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-mono font-semibold text-primary pl-6">#{item.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${currentScheme.gradient1} flex items-center justify-center`}>
                            <span className="text-xs font-bold text-white">
                              {item.user.split(' ')[0][0]}{item.user.split(' ')[1][0]}
                            </span>
                          </div>
                          <span className="font-medium">{item.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-lg">{item.amount}</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-sky-100 text-sky-700">
                          {item.method}
                        </Badge>
                      </TableCell>
                      {activeTab === 'failed' && (
                        <TableCell className="pr-6">
                          <span className="text-sm text-red-600">{item.error}</span>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};
