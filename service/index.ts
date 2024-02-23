import { notificationsArray,Notification } from './../lib/store';

export class NotificationService{
    public static async getNotifications() : Promise<Notification[]>{
        return notificationsArray;
    }
    public static async getNotificationByID(uid:number):Promise<Notification>{
        const notification = notificationsArray.find((notification) => notification.uid === uid);
        if (notification) {
            return notification;
        } else {
            throw new Error("Notification not found");
        }
    }
    public static async addNotification(notification:Notification):Promise<Notification[]>{
        const notifications = await this.getNotifications()
        const newNotifications = [...notifications, notification];
        return newNotifications;
    }
    
  public static async simulateBackendCallWithRandomResult(
    data?: any,
    time: number = 1000
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        isSuccess ? resolve(true) : resolve(false);
      }, time);
    });
  }
}