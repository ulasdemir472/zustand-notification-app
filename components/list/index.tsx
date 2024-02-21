"use client";
import Listbox from "@/components/listbox";
import { useNotificationStore, Notification } from "@/lib/store";
import { useEffect, useState } from "react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function List() {
  const [loading, setLoading] = useState(true);

  const notifications: Notification[] = useNotificationStore(
    (state) => state.notifications
  );

  const removeNotification = useNotificationStore(
    (state) => state.deleteNotification
  );

  useEffect(() => {
    useNotificationStore.persist.rehydrate();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {loading ? (
        <div className="inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        notifications?.map((notification: Notification) => (
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
              <p className="text-sm text-gray-500">
                {notification.description}
              </p>
            </div>
            <div className="flex gap-1">
              <Listbox
                initialStatus={notification.read}
                uid={notification.uid}
              />
              <button
                onClick={() => removeNotification(notification.uid)}
                className=" flex items-center justify-center gap-x-1 py-2 px-4 rounded-md bg-red-500 text-sm text-white whitespace-nowrap"
              >
                Remove
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
