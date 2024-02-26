import { validTypes } from "@/app/create/business/ContactSection";
import { create } from "zustand";

export type RealLocation = {
  longitude: number | null;
  latitude: number | null;
  altitude: number | null;
};

export type Contact = {
  link: string;
  type: keyof typeof validTypes;
};

export type Schedule = {
  day: string;
  from: string;
  to: string;
};

interface CreateBusinessStore {
  images: string[];
  setImages: (images: string[]) => void;
  removeImage: (index: number) => void;

  realLocation: RealLocation;
  setRealLocation: (realLocation: RealLocation) => void;
  isValidLocation: boolean;

  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addContact: () => void;
  popContact: () => void;

  schedule: Schedule[];
  setSchedule: (schedule: Schedule[]) => void;
  addSchedule: () => void;
  popSchedule: () => void;
}
export const useCreateBusiness = create<CreateBusinessStore>((set) => ({
  images: [],
  setImages: (newImages) => set({ images: newImages }),
  removeImage: (index) =>
    set((state) => ({ images: state.images.filter((_, i) => i !== index) })),

  realLocation: {
    longitude: null,
    latitude: null,
    altitude: null,
  },
  isValidLocation: false,
  setRealLocation: (newLocation) =>
    set((state) => ({
      realLocation: newLocation,
      isValidLocation:
        typeof newLocation.latitude === "number" &&
        typeof newLocation.longitude === "number",
    })),
  contacts: [{ link: "", type: "default" }],
  setContacts: (newContacts) => set({ contacts: newContacts }),
  addContact: () =>
    set((state) => {
      if (state.contacts.length < 5) {
        return { contacts: [...state.contacts, { link: "", type: "default" }] };
      }
      return state;
    }),
  popContact: () => set((state) => ({ contacts: state.contacts.slice(0, -1) })),

  schedule: [
    {
      day: "1",
      from: "12:00",
      to: "13:00",
    },
  ],
  setSchedule: (newSchedule) => set({ schedule: newSchedule }),
  addSchedule: () =>
    set((state) => {
      if (state.schedule.length < 10) {
        return {
          schedule: [
            ...state.schedule,
            {
              day: "1",
              from: "12:00",
              to: "13:00",
            },
          ],
        };
      }
      return state;
    }),
  popSchedule: () =>
    set((state) => ({ schedule: state.schedule.slice(0, -1) })),
}));
