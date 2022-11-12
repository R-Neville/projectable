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