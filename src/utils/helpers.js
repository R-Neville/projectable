import { errorCodes, fatalStatuses } from '../config/axiosConfig';

// Receives a timestamp and returns
// a date string in the format of
// 'Weekday Month Date Year':
export function dateFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toDateString();
}

// Dispatches a custom event identified
// as type 'show-error' with the detail
// property containing the error argument:
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

// Returns a function to be used as the callback
// in the catch method on an axios call. Receives
// two functions: onFatal (called when the error is
// 'fatal') and onDone (optionally called when the 
// rest of the logic has been executed):
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
