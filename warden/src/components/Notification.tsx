
import { notifications } from '@mantine/notifications';


export function SendNotification() {
  console.log("sending notification");
  notifications.show({ title: 'Notification title', message: 'Notification message' })

}