import {create} from 'zustand';
import { persist } from 'zustand/middleware'; 
import { NotificationService } from '@/service';

export const notificationsArray:Notification[] = [
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
  ];

export type Notification = {
  uid: number;
  name: string;
  description: string;
  read: boolean;
}

export type  NotificationActions ={ 
    isLoading: boolean;
    notifications: Notification[];
    getNotification: (uid: number) => Promise<Notification | undefined>;
    getNotifications: () => Promise<{ notifications: Notification[] }>
    addNotification: (notification: Notification) => void;
    deleteNotification: (uid: number) => void;
    updateStatus: (uid: number) => void;
    updateLoading: () => void;
 }


export const useNotificationStore = create<NotificationActions>()(
    persist(
        (set) => ({
            isLoading:false,
            notifications: notificationsArray,
            getNotification: async (uid: number) => {
              try {
                const notification = await NotificationService.getNotificationByID(uid);
                return notification;
              } catch (error) {
                console.error('Error while fetching notification:', error);
                return undefined;
              }
            },
            getNotifications: async () =>{
              try {
                const notifications = await NotificationService.getNotifications();
                set({ notifications});
                return { notifications};
            } catch (error) {
                console.error('Error while fetching notifications:', error);
                return { notifications: []}}
            },
            addNotification: (notification:Notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
            deleteNotification: (uid) => set((state) => ({ notifications: state.notifications.filter((notification) => notification.uid !== uid) })),
            updateStatus: (uid) => set((state) => ({
                notifications: state.notifications.map((notification) =>
                  notification.uid === uid
                    ? { ...notification, read: !notification.read }
                    : notification
                )
              })),
            updateLoading: () => set((state)=>({isLoading: !state.isLoading})),
            }), 
        {
            name: "notification-storage",
            skipHydration: true
        }
    )
)
