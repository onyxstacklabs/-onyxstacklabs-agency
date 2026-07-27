// Lightweight GA4 event tracking helper. Safely no-ops if gtag isn't
// loaded yet (e.g. analytics script is deferred to idle time in
// index.html) or if the user has an ad-blocker — never throws, never
// breaks the UI.
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }
  try {
    window.gtag('event', eventName, params);
  } catch {
    // Silently ignore — analytics failures should never affect the user.
  }
}

// Fires a virtual pageview for GA4. Required because this app uses
// client-side routing (react-router) — GA's automatic pageview only
// fires once on the initial hard page load, not on subsequent route
// changes. Without this, GA would only ever record the very first page
// a visitor lands on, making all navigation data invisible.
export function trackPageView(path, title) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }
  try {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.href
    });
  } catch {
    // Silently ignore.
  }
}
