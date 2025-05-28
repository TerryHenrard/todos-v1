import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { getSession } from '@/lib/server-utils';
import { redirect } from 'next/navigation';
import { Separator } from './ui/separator';
import AppSidebarFooter from './app-sidebar-footer';

const menuItems = [
  {
    title: 'Home',
    url: '',
    icon: Home,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Account',
    url: '/account',
    icon: User,
  },
];

export async function AppSidebar() {
  const session = await getSession();
  if (!session) redirect('/sign-in');

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between">
            <span>Todos-v1</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <AppSidebarFooter session={session} />
    </Sidebar>
  );
}
