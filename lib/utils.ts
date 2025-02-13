import { Shift, ShiftService } from "@/models";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupShifts(shifts: Shift[]) {
  return shifts.reduce<Record<ShiftService["id"], Record<string, Shift[]>>>(
    (acc, shift) => {
      const serviceId = shift.shiftService_id;
      const day = shift.date.split("T")[0].split("-")[2];

      if (!acc[serviceId]) {
        acc[serviceId] = {};
      }

      if (!acc[serviceId][day]) {
        acc[serviceId][day] = [];
      }

      acc[serviceId][day].push(shift);

      return acc;
    },
    {}
  );
}
