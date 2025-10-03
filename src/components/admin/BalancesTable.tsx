import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Balance, ColorSchemeConfig } from './types';

interface BalancesTableProps {
  data: Balance[];
  currentScheme: ColorSchemeConfig;
}

export const BalancesTable = ({ data, currentScheme }: BalancesTableProps) => {
  return (
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
          {data.map((item) => (
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
  );
};
