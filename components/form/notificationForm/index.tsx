"use client";
import { useNotificationStore } from "@/lib/store";
import React, { use, useEffect, useState } from "react";
import { NotificationService } from "@/service";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const NotificationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);

  let l = useNotificationStore((state) => state.isLoading);

  const notifications = useNotificationStore((state) => state.notifications);
  const updateLoading = useNotificationStore((state) => state.updateLoading);

  const [counter, setCounter] = useState(
    notifications[notifications.length - 1]?.uid + 1 || 0
  );

  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModal(false);
    updateLoading();
    const isSuccess =
      await NotificationService.simulateBackendCallWithRandomResult();
    if (isSuccess) {
      updateLoading();
      addNotification({ uid: counter, name, description, read: false });
      setName("");
      setDescription("");
      setCounter((prev) => prev + 1);
    } else {
      updateLoading();
      alert("Failed to add notification");
    }
  };

  return (
    <>
      <Dialog open={modal} onOpenChange={setModal}>
        <DialogTrigger>
          <div className="flex items-center justify-center gap-x-1 py-2 px-4 rounded-md bg-indigo-500 text-sm text-white whitespace-nowrap">
            New Notification
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Notification</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="text"
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <button
              type="submit"
              className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg relative"
            >
              Add Notification
            </button>
          </form>{" "}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationForm;
