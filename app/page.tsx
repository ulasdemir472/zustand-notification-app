import List from "@/components/list/index";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NotificationForm from "@/components/form/notificationForm";

export default function Home() {
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <Dialog>
          <DialogTrigger>
            <div className="flex items-center justify-center gap-x-1 py-2 px-4 rounded-md bg-indigo-500 text-sm text-white  whitespace-nowrap">
              New Notification
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Notification</DialogTitle>
            </DialogHeader>
            <NotificationForm />
          </DialogContent>
        </Dialog>
      </div>

      <List />
    </div>
  );
}
