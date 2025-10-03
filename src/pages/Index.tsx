import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
    balance: '15000',
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
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('balances');

  const menuItems = [
    { id: 'balances', label: 'Единые балансы', icon: 'Wallet' },
    { id: 'transactions', label: 'Транзакции пополнения Единых балансов', icon: 'ArrowDownUp' },
    { id: 'payments', label: 'Транзакции оплат балансов ЛС', icon: 'CreditCard' },
    { id: 'services', label: 'Транзакции оплат заказов в сервисов', icon: 'ShoppingCart' }
  ];

  const filteredData = mockData.filter(item => 
    item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toString().includes(searchQuery) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-72 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold tracking-tight">ADMIN DASHBOARD</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors ${
                    activeSection === item.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="text-left">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border px-8 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Единые балансы</h2>
            <div className="relative w-80">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-input"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="bg-card rounded-lg border border-border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="w-12">
                    <Icon name="Menu" size={18} className="text-muted-foreground" />
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">ID баланса</TableHead>
                  <TableHead className="font-semibold text-foreground">Пользователь</TableHead>
                  <TableHead className="font-semibold text-foreground">Баланс</TableHead>
                  <TableHead className="font-semibold text-foreground">Помещения</TableHead>
                  <TableHead className="font-semibold text-foreground">Дата создания</TableHead>
                  <TableHead className="font-semibold text-foreground">Дата изменения</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <Icon name="Menu" size={18} className="text-muted-foreground" />
                    </TableCell>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.user}</TableCell>
                    <TableCell className="font-medium">{item.balance}</TableCell>
                    <TableCell className="text-muted-foreground">{item.location}</TableCell>
                    <TableCell className="text-muted-foreground">{item.createdDate}</TableCell>
                    <TableCell className="text-muted-foreground">{item.modifiedDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
