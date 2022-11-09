export default function showError(message) {
  const customEvent = new CustomEvent('show-error', {
    bubbles: true,
    detail: {
      message,
    },
  });
  document.dispatchEvent(customEvent);
}
