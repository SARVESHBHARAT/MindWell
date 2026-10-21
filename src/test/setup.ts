import "@testing-library/jest-dom";

// jsdom does not implement scrollIntoView; stub it for components that scroll
// into view (e.g. chat message autoscroll).
Object.defineProperty(Element.prototype, "scrollIntoView", {
  value: () => {},
  writable: true,
});
