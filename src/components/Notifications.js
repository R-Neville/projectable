import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dateFromTimestamp } from '../utils/helpers';


export default function Notifications({ assignedTasks }) {
  let currentDate = dateFromTimestamp(new Date())
  let dueTasks = assignedTasks.filter((task) => dateFromTimestamp(task.deadline) === currentDate);
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
