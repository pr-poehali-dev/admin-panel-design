import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColorScheme, colorSchemes } from './types';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  colorScheme: ColorScheme;
  onColorSchemeChange: (scheme: ColorScheme) => void;
}

const menuItems = [
  { id: 'balances', label: 'Единые балансы', icon: 'Wallet' },
  { id: 'transactions', label: 'Транзакции пополнения', icon: 'ArrowDownUp' },
  { id: 'payments', label: 'Оплаты балансов ЛС', icon: 'CreditCard' },
  { id: 'services', label: 'Оплаты заказов', icon: 'ShoppingCart' }
];

export const Sidebar = ({ activeSection, onSectionChange, colorScheme, onColorSchemeChange }: SidebarProps) => {
  return (
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
                onClick={() => onSectionChange(item.id)}
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
          <Select value={colorScheme} onValueChange={(value) => onColorSchemeChange(value as ColorScheme)}>
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
  );
};
