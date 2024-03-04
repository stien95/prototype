"use client"
import { Schedule } from "@prisma/client";
import {format, parseISO} from "date-fns";
export default function ScheduleBusiness({
  schedule,
}: {
  schedule: Schedule[];
}) {
  const days = {
    "1": "Lunes",
    "2": "Martes",
    "3": "Miércoles",
    "4": "Jueves",
    "5": "Viernes",
    "6": "Sábado",
  };
  const formattedSchedule = schedule.map(element => {
    const formattedDay = days[element.day as keyof typeof days];
    const formattedFrom = format(parseISO(`2000-01-01T${element.from}:00`), "h:mm a");
    const formattedTo = format(parseISO(`2000-01-01T${element.to}:00`), "h:mm a");
    return `${formattedDay}: ${formattedFrom} - ${formattedTo}`;
  })
  return (
    <ul>
      <h3 className="text-2xl text-gray-700 font-bold">Horario</h3>
      {schedule.map((element, index) => (
        <li key={element.id}>
          <span>{formattedSchedule[index]}</span>
        </li>
      ))}
    </ul>
  );
}
