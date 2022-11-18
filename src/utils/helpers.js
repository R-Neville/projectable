import { errorCodes, fatalStatuses } from '../config/axiosConfig';

export function dateFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toDateString();
}

export function showError(error) {
  document.dispatchEvent(
    new CustomEvent('show-error', {
      bubbles: true,
      detail: {
        error,
      },
    })
  );
}

export function buildAxiosErrorHandler(onFatal, onDone) {
  return (error) => {
    if (!error.response) {
      onFatal();
      return showError(error);
    }

    if (error.code === errorCodes.ERR_NETWORK) {
      onFatal();
    }

    if (fatalStatuses.includes(error.response.status)) {
      onFatal();
    }

    showError(error);
    if (onDone) onDone();
  };
}
