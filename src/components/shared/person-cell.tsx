import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = { name: string; subtitle?: string; image?: string };

const initials = (name: string) =>
  name.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toUpperCase();

export function PersonCell({ name, subtitle, image }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-8">
        {image && <AvatarImage src={image} alt={name} className="object-cover" />}
        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">{initials(name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{name}</p>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}
