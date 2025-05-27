'use client';

import { ChevronUp, LogOut, User2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import { authClient, Session } from '@/lib/auth-client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface AppSidebarFooterProps {
  session: Session;
}

const AppSidebarFooter = ({ session }: AppSidebarFooterProps) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/sign-in');
          },
        },
      });
    },
  });

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 /> {session.user.name}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top">
              <DropdownMenuItem
                disabled={mutation.isPending}
                onClick={() => mutation.mutate()}
              >
                <LogOut />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default AppSidebarFooter;

