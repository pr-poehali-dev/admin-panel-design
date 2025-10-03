import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Balance {
  id: number;
  user: string;
  balance: string;
  location: string;
  createdDate: string;
  modifiedDate: string;
}

const mockData: Balance[] = [
  {
    id: 123,
    user: 'Иванов И. И.',
    balance: '1000 ₽',
    location: '14 кв, ул. Дружбы',
    createdDate: '1.08.2025',
    modifiedDate: '2.09.2025'
  },
  {
    id: 124,
    user: 'Петрова А. А.',
    balance: '15000 ₽',
    location: '28 кв, ул. Усачева',
    createdDate: '5.07.2025',
    modifiedDate: '1.09.2025'
  },
  {
    id: 125,
    user: 'Сидоров П. К.',
    balance: '3500 ₽',
    location: '45 кв, ул. Ленина',
    createdDate: '12.06.2025',
    modifiedDate: '15.08.2025'
  },
  {
    id: 126,
    user: 'Кузнецова М. В.',
    balance: '8200 ₽',
    location: '7 кв, ул. Мира',
    createdDate: '3.05.2025',
    modifiedDate: '20.08.2025'
  },
  {
    id: 127,
    user: 'Смирнов Д. Л.',
    balance: '12500 ₽',
    location: '32 кв, ул. Победы',
    createdDate: '15.04.2025',
    modifiedDate: '10.09.2025'
  },
  {
    id: 128,
    user: 'Новикова Е. С.',
    balance: '6700 ₽',
    location: '19 кв, ул. Советская',
    createdDate: '22.03.2025',
    modifiedDate: '5.09.2025'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('balances');

  const menuItems = [
    { id: 'balances', label: 'Единые балансы', icon: 'Wallet' },
    { id: 'transactions', label: 'Транзакции пополнения', icon: 'ArrowDownUp' },
    { id: 'payments', label: 'Оплаты балансов ЛС', icon: 'CreditCard' },
    { id: 'services', label: 'Оплаты заказов', icon: 'ShoppingCart' }
  ];

  const stats = [
    { label: 'Всего балансов', value: '6', icon: 'Users', color: 'text-purple-600' },
    { label: 'Общая сумма', value: '46 900 ₽', icon: 'TrendingUp', color: 'text-green-600' },
    { label: 'Активных', value: '6', icon: 'Activity', color: 'text-blue-600' },
  ];

  const filteredData = mockData.filter(item => 
    item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toString().includes(searchQuery) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <div className="p-4 border-t border-sidebar-border">
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
            <div className="relative w-96">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск по пользователям, ID, адресам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background border-input rounded-xl shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-5 border-0 shadow-sm bg-gradient-to-br from-card to-muted/20">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-background flex items-center justify-center ${stat.color}`}>
                    <Icon name={stat.icon as any} size={22} />
                  </div>
                </div>
              </Card>
            ))}
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
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
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
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                        Активен
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

export default Index;
