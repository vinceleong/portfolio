const STORAGE_KEY = "ada-attribution";
const TRACKED = /^(utm_[a-z]+|biz|ref)$/;

function readStored() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

// Keeps the last tagged visit so attribution survives a later untagged revisit.
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const tags = {};
  params.forEach((value, key) => {
    if (TRACKED.test(key) && value) tags[key] = value.slice(0, 200);
  });

  if (Object.keys(tags).length === 0) return readStored();

  const data = {
    ...tags,
    landing_url: window.location.href.slice(0, 500),
    referrer: document.referrer.slice(0, 500),
    first_seen: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
  return data;
}
