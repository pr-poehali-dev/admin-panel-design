export interface Balance {
  id: number;
  user: string;
  balance: string;
  location: string;
  createdDate: string;
  modifiedDate: string;
  status: 'active' | 'inactive';
}

export type ColorScheme = 'blue' | 'green' | 'purple' | 'teal' | 'rose' | 'amber';

export interface ColorSchemeConfig {
  gradient1: string;
  gradient2: string;
  gradient3: string;
  name: string;
}

export const colorSchemes: Record<ColorScheme, ColorSchemeConfig> = {
  blue: { gradient1: 'gradient-blue', gradient2: 'gradient-green', gradient3: 'gradient-teal', name: 'Синяя' },
  green: { gradient1: 'gradient-green', gradient2: 'gradient-teal', gradient3: 'gradient-blue', name: 'Зелёная' },
  purple: { gradient1: 'gradient-orange', gradient2: 'gradient-blue', gradient3: 'gradient-rose', name: 'Фиолетовая' },
  teal: { gradient1: 'gradient-teal', gradient2: 'gradient-green', gradient3: 'gradient-blue', name: 'Бирюзовая' },
  rose: { gradient1: 'gradient-rose', gradient2: 'gradient-orange', gradient3: 'gradient-amber', name: 'Розовая' },
  amber: { gradient1: 'gradient-amber', gradient2: 'gradient-orange', gradient3: 'gradient-rose', name: 'Янтарная' }
};

export const mockData: Balance[] = [
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
