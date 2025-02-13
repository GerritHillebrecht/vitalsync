import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { shiftServiceIcons } from "@/lib/icons";
import { ShiftService } from "@/models";

interface PlannerDayShiftItemProps {
  shiftService: ShiftService;
}

export function PlannerDayShiftItem({
  shiftService,
}: PlannerDayShiftItemProps) {
  const icon_shape = shiftService.icon_shape as keyof typeof shiftServiceIcons;
  const IconComponent = shiftServiceIcons[icon_shape];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="absolute cursor-pointer inset-0 flex items-center justify-center lg:hover:bg-muted-foreground/10">
          <IconComponent
            className="text-cyan-700"
            color={shiftService.icon_color}
            size={34}
            strokeWidth={0.75}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[0.5rem]">

            {shiftService.shiftServiceType?.type_name.charAt(0)}
            {shiftService.clients?.[0].firstname.charAt(0)}
            {shiftService.clients?.[0].lastname.charAt(0)}
            </span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
