import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatsCards } from './StatsCards';

interface BalancesHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onExport: () => void;
  stats: Array<{ label: string; value: string; icon: string; gradient: string }>;
}

export const BalancesHeader = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onExport,
  stats
}: BalancesHeaderProps) => {
  return (
    <header className="bg-card/50 backdrop-blur-sm border-b border-border px-8 py-6 sticky top-0 z-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-1">Единые балансы</h2>
          <p className="text-sm text-muted-foreground">Управление балансами пользователей</p>
        </div>
        <Button onClick={onExport} className="bg-accent hover:bg-accent/90 gap-2">
          <Icon name="Download" size={18} />
          Экспорт в Excel
        </Button>
      </div>

      <StatsCards stats={stats} />

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Поиск по пользователям, ID, адресам..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-12 bg-background border-input rounded-xl shadow-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
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
  );
};
