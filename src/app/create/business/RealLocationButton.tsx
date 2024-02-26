import { useCreateBusiness } from "@/store/useCreateBusiness";
import clsx from "clsx";
import { MdCancel } from "react-icons/md";


export default function RealLocationButton() {
  const setRealLocation = useCreateBusiness((state) => state.setRealLocation);
  const isValidLocation = useCreateBusiness((state) => state.isValidLocation);
  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      const altitude = position.coords.altitude;
      setRealLocation({ longitude, latitude, altitude });
    });
  };
  return (
    <button
          type="button"
          onClick={handleLocation}
          className={clsx(
            "transition-colors relative rounded-lg p-2 border w-max",
            isValidLocation
              ? "bg-emerald-400 text-white cursor-default"
              : "text-gray-600  border-gray-200"
          )}
        >
          Ubicación real{" "}
          {isValidLocation ? (
            <span
              className="absolute -top-2 -right-2 bg-white h-6 w-6 text-sm flex justify-center items-center rounded-full scale-75 cursor-pointer"
              title="Cancelar"
              onClick={(e) =>
                {
                  e.stopPropagation();
                  setRealLocation({
                    altitude: null,
                    latitude: null,
                    longitude: null,
                  })
                }
              }
            >
              <MdCancel className="text-emerald-600 w-full h-full"/>
            </span>
          ) : (
            <span
              className="absolute -top-2 -right-2 bg-sky-300 text-white h-6 w-6 text-sm flex justify-center items-center rounded-full scale-75 cursor-default"
              title={`Ubícate en el lugar que vas a vender`}
            >
              ?
            </span>
          )}
        </button>
  )
}
