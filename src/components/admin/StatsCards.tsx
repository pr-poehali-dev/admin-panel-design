import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  gradient: string;
}

interface StatsCardsProps {
  stats: StatCard[];
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
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
  );
};
