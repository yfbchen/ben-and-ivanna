import { track } from "@vercel/analytics";
import { useEffect } from "react";

const normalizeText = (value: string) => value.replace(/\s+/g, " ").trim();
const NAVIGATION_EVENT = "analytics:navigation";
const PAGE_STATE_MIN_DWELL_MS = 5000;

const getLocationPayload = () => ({
  path: window.location.pathname,
  search: window.location.search || undefined,
  hash: window.location.hash || undefined,
});

const getButtonLabel = (button: HTMLElement) => {
  const dataLabel = button.getAttribute("data-analytics-label");
  if (dataLabel) {
    return normalizeText(dataLabel).slice(0, 120);
  }

  const ariaLabel = button.getAttribute("aria-label");
  if (ariaLabel) {
    return normalizeText(ariaLabel).slice(0, 120);
  }

  const text = normalizeText(button.textContent ?? "");
  if (text) {
    return text.slice(0, 120);
  }

  return "unlabeled_button";
};

const ButtonClickTracker = () => {
  useEffect(() => {
    let lastTrackedLocation = "";
    let pageStateTimeoutId: number | undefined;

    const schedulePageStateTrack = (source: string) => {
      const locationKey = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (locationKey === lastTrackedLocation) {
        return;
      }

      if (pageStateTimeoutId !== undefined) {
        window.clearTimeout(pageStateTimeoutId);
      }

      const payload = getLocationPayload();
      pageStateTimeoutId = window.setTimeout(() => {
        const currentLocationKey = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (currentLocationKey !== locationKey || locationKey === lastTrackedLocation) {
          return;
        }

        lastTrackedLocation = locationKey;
        track("page_state_change", {
          source,
          ...payload,
        });
      }, PAGE_STATE_MIN_DWELL_MS);
    };

    const onNavigation = (event: Event) => {
      const source = event.type === NAVIGATION_EVENT ? "history_change" : event.type;
      schedulePageStateTrack(source);
    };

    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = function pushState(...args) {
      const result = originalPushState(...args);
      window.dispatchEvent(new Event(NAVIGATION_EVENT));
      return result;
    };

    window.history.replaceState = function replaceState(...args) {
      const result = originalReplaceState(...args);
      window.dispatchEvent(new Event(NAVIGATION_EVENT));
      return result;
    };

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const button = event.target.closest("button, [role='button']");
      if (!(button instanceof HTMLElement)) {
        return;
      }

      if (button instanceof HTMLButtonElement && button.disabled) {
        return;
      }

      const eventName = button.getAttribute("data-analytics-event") || "button_click";

      track(eventName, {
        label: getButtonLabel(button),
        ...getLocationPayload(),
        id: button.id || undefined,
        type: button.getAttribute("type") || undefined,
      });
    };

    schedulePageStateTrack("initial_load");
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onNavigation);
    window.addEventListener("hashchange", onNavigation);
    window.addEventListener(NAVIGATION_EVENT, onNavigation);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onNavigation);
      window.removeEventListener("hashchange", onNavigation);
      window.removeEventListener(NAVIGATION_EVENT, onNavigation);
      if (pageStateTimeoutId !== undefined) {
        window.clearTimeout(pageStateTimeoutId);
      }
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return null;
};

export default ButtonClickTracker;
