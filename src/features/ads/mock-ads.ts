import type { Ad } from "./schemas";

export const mockAds: Ad[] = [
  { id: "ad1", title: "مطلوب Video Editor", body: "انضم لفريق الإنتاج، والتقديم من صفحة Join Us.", placement: "home", source: "company", startsAt: "2026-10-01", endsAt: "2026-10-31", published: true },
  { id: "ad2", title: "منيو الشتاء من Bite Burgers", body: "عروض خاصة لمتابعي ProGanda.", placement: "offers", source: "brand", brandName: "Bite Burgers", startsAt: "2026-11-01", endsAt: "2026-11-15", published: true },
  { id: "ad3", title: "افتتاح فرع كافيه ريزا", body: "افتتاح الفرع الجديد في مدينة نصر.", placement: "offers", source: "brand", brandName: "كافيه ريزا", startsAt: "2026-09-01", endsAt: "2026-09-20", published: true },
  { id: "ad4", title: "حملة العيد", body: "مسودة لحملة موسمية.", placement: "home", source: "company", startsAt: "2026-12-01", endsAt: "2026-12-10", published: false },
];
