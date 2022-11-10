export default function showError(error) {
  const customEvent = new CustomEvent('show-error', {
    bubbles: true,
    detail: {
      error,
    },
  });
  document.dispatchEvent(customEvent);
}
