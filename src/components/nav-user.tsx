"use client";

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
import {
  UserIcon,
  BellIcon,
  CommandIcon,
  LifeBuoyIcon,
  BookOpenIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

const user = {
  name: "Shaban Haider",
  email: "shaban@efferd.com",
  avatar: "https://github.com/shabanhr.png",
};

export function NavUser() {
  const t = useTranslations("dashboard");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild aria-label={t("profileMenu")}>
        <Avatar className="size-8">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem className="flex items-center justify-start gap-2">
          <DropdownMenuLabel className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium text-foreground">{user.name}</span>{" "}
              <br />
              <div className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-muted-foreground text-xs">
                {user.email}
              </div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">
                {t("storeOwner")}
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon />
            {t("profileMenu")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BellIcon />
            {t("notifications")}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CommandIcon />
            {t("keyboardShortcuts")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LifeBuoyIcon />
            {t("sellerHelp")}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon />
            {t("sellerGuides")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CreditCardIcon />
            {t("planBilling")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="w-full cursor-pointer"
            variant="destructive"
          >
            <LogOutIcon />
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
