"use client";

import { BadgeCheck, Bell, ChevronsUpDown, LogOut, Sparkles, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";

export function NavUser() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2 p-1">
        <div className="size-8.5 animate-pulse rounded-xl bg-muted" />
        <div className="hidden lg:flex flex-col gap-1">
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          <div className="h-2 w-28 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-2 rounded-xl p-1.5 text-left transition-all hover:bg-accent/60 outline-none ring-primary focus-visible:ring-2 border border-transparent hover:border-border/40">
          <Avatar className="size-8.5 rounded-xl border border-border/60 shadow-xs">
            <AvatarImage src={user?.image || undefined} alt={user?.name || "User Avatar"} />
            <AvatarFallback className="rounded-xl bg-primary/10 text-xs font-bold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="hidden lg:flex flex-col text-xs leading-tight text-start">
            <span className="font-semibold text-foreground truncate max-w-30">
              {user?.name || "Admin User"}
            </span>
            <span className="text-[10px] text-muted-foreground truncate max-w-35">
              {user?.email || "admin@domain.com"}
            </span>
          </div>

          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 rounded-2xl border border-border/60 bg-card/95 p-1.5 shadow-xl backdrop-blur-xl"
        align="center"
        sideOffset={8}
      >
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="size-9 rounded-xl border border-border/60">
              <AvatarImage src={user?.image || undefined} alt={user?.name || "User Avatar"} />
              <AvatarFallback className="rounded-xl bg-primary/10 text-xs font-bold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 text-start">
              <p className="text-xs font-bold text-foreground truncate">{user?.name || "User"}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.email || ""}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-border/40" />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer rounded-xl gap-2 text-xs py-2">
            <Sparkles className="size-4 text-amber-500" />
            <span>System Status</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border/40" />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer rounded-xl gap-2 text-xs py-2">
            <User className="size-4 text-muted-foreground" />
            <span>Account Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer rounded-xl gap-2 text-xs py-2">
            <BadgeCheck className="size-4 text-muted-foreground" />
            <span>Permissions</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer rounded-xl gap-2 text-xs py-2">
            <Bell className="size-4 text-muted-foreground" />
            <span>Notifications</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border/40" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer rounded-xl gap-2 text-xs py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}