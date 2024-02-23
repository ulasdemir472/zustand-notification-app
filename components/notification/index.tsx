import React from "react";
import Listbox from "../listbox";
import { useNotificationStore } from "@/lib/store";
import { Notification } from "@/lib/store";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Notification = ({ notification }: { notification: Notification }) => {
  const removeNotification = useNotificationStore(
    (state) => state.deleteNotification
  );

  return (
    <li
      key={notification.uid}
      className={classNames(
        notification.read ? "bg-slate-400" : "",
        "flex items-center justify-between gap-x-6 py-5 px-2 rounded-md transition duration-200 ease-in-out mt-2"
      )}
    >
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {notification.name}
          </p>
        </div>
        <p className="text-sm text-gray-500">{notification.description}</p>
      </div>
      <div className="flex gap-1">
        <Listbox initialStatus={notification.read} uid={notification.uid} />
        <button
          onClick={() => removeNotification(notification.uid)}
          className=" flex items-center justify-center gap-x-1 py-2 px-4 rounded-md bg-red-500 text-sm text-white whitespace-nowrap"
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default Notification;
