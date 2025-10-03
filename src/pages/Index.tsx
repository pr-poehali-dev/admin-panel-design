import { useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { BalancesHeader } from '@/components/admin/BalancesHeader';
import { BalancesTable } from '@/components/admin/BalancesTable';
import { TransactionsPage } from '@/components/admin/TransactionsPage';
import { ColorScheme, colorSchemes, mockData } from '@/components/admin/types';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('balances');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('blue');

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
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        colorScheme={colorScheme}
        onColorSchemeChange={setColorScheme}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <BalancesHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onExport={exportToExcel}
          stats={stats}
        />

        <div className="flex-1 overflow-auto p-8">
          <BalancesTable data={filteredData} currentScheme={currentScheme} />
        </div>
      </main>
    </div>
  );
};

export default Index;
