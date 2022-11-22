import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

export default function Notifications({ assignedTasks }) {
  let currentDate = format(new Date(), 'yyyy-MM-dd');
  let dueTasks = assignedTasks.filter((task) => task.deadline === currentDate);
  const customId = 'custom-toast';

  const notify = (tasks) => {
    toast.info(`You have ${tasks.length} tasks due today !`, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: customId
    });
  };

  if(dueTasks.length){
    notify(dueTasks)
  }

  return (
    <>
      <ToastContainer limit={1} />
    </>
  );
}
