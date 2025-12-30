export type PageView = 'home' | 'about' | 'contact';

export interface NavItem {
  id: PageView;
  label: string;
}