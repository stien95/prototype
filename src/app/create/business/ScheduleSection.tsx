import { useCreateBusiness } from "@/store/useCreateBusiness";
import OperationButton from "./OperationButton";


export default function ScheduleSection() {
  const schedule = useCreateBusiness(state => state.schedule);
  const setSchedule = useCreateBusiness(state => state.setSchedule);
  const addSchedule = useCreateBusiness(state => state.addSchedule);
  const popSchedule = useCreateBusiness(state => state.popSchedule);
  
  const scheduleHandler = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    index: number,
    property: "day" | "from" | "to"
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index][property] = e.target.value;
    setSchedule(newSchedule);
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center text-gray-500 gap-2">
        <h2 className="font-bold text-xl">🗓 Horario</h2>
        <OperationButton
          onClick={addSchedule}
          disabled={schedule.length > 10}
        >
          +
        </OperationButton>
        <OperationButton
          onClick={popSchedule}
          disabled={schedule.length <= 1}
        >
          -
        </OperationButton>
      </div>
      <div className="flex flex-col gap-2">
        {schedule.map((element, index) => (
          <div key={index} className="flex gap-2 justify-center">
            <select onChange={(e) => scheduleHandler(e, index, "day")}>
              <option value="1">Lunes</option>
              <option value="2">Martes</option>
              <option value="3">Miércoles</option>
              <option value="4">Jueves</option>
              <option value="5">Viernes</option>
              <option value="6">Sábado</option>
            </select>
            de
            <input
              type="time"
              value={element.from}
              onChange={(e) => scheduleHandler(e, index, "from")}
            />
            a
            <input
              type="time"
              value={element.to}
              onChange={(e) => scheduleHandler(e, index, "to")}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
