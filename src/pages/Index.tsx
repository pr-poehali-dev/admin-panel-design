import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Balance {
  id: number;
  user: string;
  balance: string;
  location: string;
  createdDate: string;
  modifiedDate: string;
  status: 'active' | 'inactive';
}

const mockData: Balance[] = [
  {
    id: 123,
    user: 'Иванов И. И.',
    balance: '1000 ₽',
    location: '14 кв, ул. Дружбы',
    createdDate: '1.08.2025',
    modifiedDate: '2.09.2025',
    status: 'active'
  },
  {
    id: 124,
    user: 'Петрова А. А.',
    balance: '15000 ₽',
    location: '28 кв, ул. Усачева',
    createdDate: '5.07.2025',
    modifiedDate: '1.09.2025',
    status: 'active'
  },
  {
    id: 125,
    user: 'Сидоров П. К.',
    balance: '3500 ₽',
    location: '45 кв, ул. Ленина',
    createdDate: '12.06.2025',
    modifiedDate: '15.08.2025',
    status: 'active'
  },
  {
    id: 126,
    user: 'Кузнецова М. В.',
    balance: '8200 ₽',
    location: '7 кв, ул. Мира',
    createdDate: '3.05.2025',
    modifiedDate: '20.08.2025',
    status: 'active'
  },
  {
    id: 127,
    user: 'Смирнов Д. Л.',
    balance: '12500 ₽',
    location: '32 кв, ул. Победы',
    createdDate: '15.04.2025',
    modifiedDate: '10.09.2025',
    status: 'active'
  },
  {
    id: 128,
    user: 'Новикова Е. С.',
    balance: '6700 ₽',
    location: '19 кв, ул. Советская',
    createdDate: '22.03.2025',
    modifiedDate: '5.09.2025',
    status: 'inactive'
  }
];

type ColorScheme = 'blue' | 'green' | 'purple' | 'teal' | 'rose' | 'amber';

const colorSchemes = {
  blue: { gradient1: 'gradient-blue', gradient2: 'gradient-green', gradient3: 'gradient-teal', name: 'Синяя' },
  green: { gradient1: 'gradient-green', gradient2: 'gradient-teal', gradient3: 'gradient-blue', name: 'Зелёная' },
  purple: { gradient1: 'gradient-orange', gradient2: 'gradient-blue', gradient3: 'gradient-rose', name: 'Фиолетовая' },
  teal: { gradient1: 'gradient-teal', gradient2: 'gradient-green', gradient3: 'gradient-blue', name: 'Бирюзовая' },
  rose: { gradient1: 'gradient-rose', gradient2: 'gradient-orange', gradient3: 'gradient-amber', name: 'Розовая' },
  amber: { gradient1: 'gradient-amber', gradient2: 'gradient-orange', gradient3: 'gradient-rose', name: 'Янтарная' }
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('balances');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('blue');

  const menuItems = [
    { id: 'balances', label: 'Единые балансы', icon: 'Wallet' },
    { id: 'transactions', label: 'Транзакции пополнения', icon: 'ArrowDownUp' },
    { id: 'payments', label: 'Оплаты балансов ЛС', icon: 'CreditCard' },
    { id: 'services', label: 'Оплаты заказов', icon: 'ShoppingCart' }
  ];

  const currentScheme = colorSchemes[colorScheme];

  const stats = [
    { label: 'Всего балансов', value: '6', icon: 'Users', gradient: currentScheme.gradient1 },
    { label: 'Общая сумма', value: '46 900 ₽', icon: 'TrendingUp', gradient: currentScheme.gradient2 },
    { label: 'Активных', value: '5', icon: 'Activity', gradient: currentScheme.gradient3 },
  ];

  const exportToExcel = () => {
    const headers = ['ID', 'Пользователь', 'Баланс', 'Помещение', 'Дата создания', 'Дата изменения', 'Статус'];
    const rows = filteredData.map(item => [
      item.id,
      item.user,
      item.balance,
      item.location,
      item.createdDate,
      item.modifiedDate,
      item.status === 'active' ? 'Активен' : 'Неактивен'
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `balances_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredData = mockData.filter(item => {
    const matchesSearch = 
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().includes(searchQuery) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (activeSection === 'transactions') {
    return <TransactionsPage onBack={() => setActiveSection('balances')} colorScheme={colorScheme} />;
  }

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
          <ul className="space-y-1">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-4">
          <div>
            <p className="text-xs text-sidebar-foreground/60 mb-2 px-3">Цветовая схема</p>
            <Select value={colorScheme} onValueChange={(value) => setColorScheme(value as ColorScheme)}>
              <SelectTrigger className="w-full bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(colorSchemes).map(([key, scheme]) => (
                  <SelectItem key={key} value={key}>{scheme.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="User" size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Администратор</p>
              <p className="text-xs text-sidebar-foreground/60">admin@system.ru</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card/50 backdrop-blur-sm border-b border-border px-8 py-6 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-1">Единые балансы</h2>
              <p className="text-sm text-muted-foreground">Управление балансами пользователей</p>
            </div>
            <Button onClick={exportToExcel} className="bg-accent hover:bg-accent/90 gap-2">
              <Icon name="Download" size={18} />
              Экспорт в Excel
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} className={`p-5 border-0 shadow-lg ${stat.gradient} text-white overflow-hidden relative`}>
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <p className="text-sm text-white/90 font-medium mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Icon name={stat.icon as any} size={22} />
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск по пользователям, ID, адресам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background border-input rounded-xl shadow-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 h-12 rounded-xl shadow-sm">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="inactive">Неактивные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <Card className="border-0 shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent bg-muted/30">
                  <TableHead className="font-semibold text-foreground pl-6">ID</TableHead>
                  <TableHead className="font-semibold text-foreground">Пользователь</TableHead>
                  <TableHead className="font-semibold text-foreground">Баланс</TableHead>
                  <TableHead className="font-semibold text-foreground">Помещение</TableHead>
                  <TableHead className="font-semibold text-foreground">Создан</TableHead>
                  <TableHead className="font-semibold text-foreground">Изменён</TableHead>
                  <TableHead className="font-semibold text-foreground pr-6">Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <TableCell className="font-mono font-semibold text-primary pl-6">#{item.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${currentScheme.gradient1} flex items-center justify-center`}>
                          <span className="text-xs font-bold text-white">
                            {item.user.split(' ')[0][0]}{item.user.split(' ')[1][0]}
                          </span>
                        </div>
                        <span className="font-medium">{item.user}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-lg">{item.balance}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" size={14} className="text-muted-foreground/60" />
                        {item.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{item.createdDate}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{item.modifiedDate}</TableCell>
                    <TableCell className="pr-6">
                      <Badge 
                        variant="secondary" 
                        className={item.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-100'}
                      >
                        {item.status === 'active' ? 'Активен' : 'Неактивен'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
};

const TransactionsPage = ({ onBack, colorScheme }: { onBack: () => void; colorScheme: ColorScheme }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const currentScheme = colorSchemes[colorScheme];

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

export default Index;
