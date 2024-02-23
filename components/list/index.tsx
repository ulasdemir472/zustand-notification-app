"use client";
import { useNotificationStore, Notification } from "@/lib/store";
import { useEffect, useState } from "react";
import NotificationComponent from "../notification";
import NotificationForm from "../form/notificationForm";

export default function List() {
  const [loading, setLoading] = useState(true);

  const notifications: Notification[] = useNotificationStore(
    (state) => state.notifications
  );
  const loadingNotification: boolean = useNotificationStore(
    (state) => state.isLoading
  );

  useEffect(() => {
    useNotificationStore.persist.rehydrate();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log("LIST", loadingNotification);
  }, [loadingNotification]);

  return (
    <>
      <NotificationForm />
      <ul role="list" className="divide-y divide-gray-100">
        {loading ? (
          <div className="inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin"></div>
          </div>
        ) : (
          notifications?.map((notification: Notification) =>
            loadingNotification ? (
              <li
                key={notification.uid}
                className="flex items-center justify-between gap-x-6 py-5 px-2 rounded-md transition duration-200 ease-in-out mt-2 animate-pulse"
              >
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3">
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-48 h-3 mt-1 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-1">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                </div>
              </li>
            ) : (
              <NotificationComponent
                notification={notification}
                key={notification.uid}
              />
            )
          )
        )}
      </ul>
    </>
  );
}
