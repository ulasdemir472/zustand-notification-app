import { get } from 'http';
import {create} from 'zustand';
import { persist } from 'zustand/middleware'; 

const notificationsArray = [
    {
      uid: 1,
      name: "New Lemons Arrived",
      description: "These Lemons are Delicious",
      read: true,
    },
    {
      uid: 2,
      name: "New Oranges Arrived",
      description: "These Oranges are Delicious",
      read: true,
    },
    {
      uid: 3,
      name: "New Apples Arrived",
      description: "These Apples are Delicious",
      read: true,
    },
    {
      uid: 4,
      name: "New Bananas Arrived",
      description: "These Bananas are Delicious",
      read: false,
    },
    {
      uid: 5,
      name: "New Grapes Arrived",
      description: "These Grapes are Delicious",
      read: false,
    },
    {
      uid: 6,
      name: "New Pears Arrived",
      description: "These Pears are Delicious",
      read: true,
    },
    {
      uid: 7,
      name: "New Pineapples Arrived",
      description: "These Pineapples are Delicious",
      read: true,
    },
    {
      uid: 8,
      name: "New Watermelons Arrived",
      description: "These Watermelons are Delicious",
      read: false,
    },
    {
      uid: 9,
      name: "New Mangoes Arrived",
      description: "These Mangoes are Delicious",
      read: false,
    },
    {
      uid: 10,
      name: "New Kiwis Arrived",
      description: "These Kiwis are Delicious",
      read: false,
    },
    {
      uid: 11,
      name: "New Strawberries Arrived",
      description: "These Strawberries are Delicious",
      read: true,
    },
    {
      uid: 12,
      name: "New Blueberries Arrived",
      description: "These Blueberries are Delicious",
      read: true,
    },
    {
      uid: 13,
      name: "New Raspberries Arrived",
      description: "These Raspberries are Delicious",
      read: true,
    },
    {
      uid: 14,
      name: "New Blackberries Arrived",
      description: "These Blackberries are Delicious",
      read: false,
    },
    {
      uid: 15,
      name: "New Cherries Arrived",
      description: "These Cherries are Delicious",
      read: false,
    },
    {
      uid: 16,
      name: "New Peaches Arrived",
      description: "These Peaches are Delicious",
      read: false,
    },
    {
      uid: 17,
      name: "New Plums Arrived",
      description: "These Plums are Delicious",
      read: true,
    },
    {
      uid: 18,
      name: "New Apricots Arrived",
      description: "These Apricots are Delicious",
      read: false,
    },
    {
      uid: 19,
      name: "New Nectarines Arrived",
      description: "These Nectarines are Delicious",
      read: false,
    },
    {
      uid: 20,
      name: "New Pomegranates Arrived",
      description: "These Pomegranates are Delicious",
      read: true,
    },
  ];

export type Notification = {
  uid: number;
  name: string;
  description: string;
  read: boolean;
}

export type  NotificationActions ={ 
    notifications: Notification[];
    addNotification: (notification: Notification) => void;
    deleteNotification: (uid: number) => void;
    updateStatus: (uid: number) => void;
 }

export const useNotificationStore = create<NotificationActions>()(
    persist(
        (set,get) => ({
            notifications: [],
            addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
            deleteNotification: (uid) => set((state) => ({ notifications: state.notifications.filter((notification) => notification.uid !== uid) })),
            updateStatus: (uid) => set((state) => ({
                notifications: state.notifications.map((notification) =>
                  notification.uid === uid
                    ? { ...notification, read: !notification.read }
                    : notification
                )
              })),
            }), 
        {
            name: "notification-storage",
            skipHydration: true
        }
    )
)
