import { errorCodes, fatalStatuses } from "../config/axiosConfig";

export function dateFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toDateString();
}

export function showError(error) {
  const customEvent = new CustomEvent('show-error', {
    bubbles: true,
    detail: {
      error,
    },
  });
  document.dispatchEvent(customEvent);
}

export function buildAxiosErrorHandler(onFatal, onDone) {
  return (error) => {
    if (error.code === errorCodes.ERR_NETWORK) {
      onFatal();
    }

    if (fatalStatuses.includes(error.status)) {
      onFatal();
    }

    showError(error);
    if (onDone) onDone();
  };
}