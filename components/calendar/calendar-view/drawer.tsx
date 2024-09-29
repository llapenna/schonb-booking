"use client";

import { dayjs } from "@/lib/date";
import { useState } from "react";

import {
  Button,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Combobox,
} from "@/components/ui";
import { usePeople, useReservations } from "@/components/context/data";

import { DialogProps } from "./types";

export const Drawer = ({ editingDay }: DialogProps) => {
  const people = usePeople();
  const reservations = useReservations();

  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const reservation = reservations.find(
    (r) => dayjs(r.date).format("YYYY-MM-DD") === editingDay
  );

  const peopleList = people.map((p) => ({
    value: String(p.id),
    label: p.name,
  }));

  const handleSubmit = () => {
    if (reservation) {
      fetch(`/reservation/${reservation.id}`, {
        method: "PUT",
        body: JSON.stringify({
          people: selectedPeople,
        }),
      });
    } else {
      fetch("/reservation", {
        method: "POST",
        body: JSON.stringify({
          people: selectedPeople,
          date: editingDay,
        }),
      });
    }
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{reservation ? "Edit" : "Make"} reservation</DrawerTitle>
      </DrawerHeader>

      {/* BODY */}
      <div className="px-4">
        <Combobox
          defaultValues={reservation?.people.map((p) => String(p.id))}
          options={peopleList}
          onSelect={(values) => setSelectedPeople(values)}
        />
      </div>

      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button onClick={handleSubmit}>Save</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
