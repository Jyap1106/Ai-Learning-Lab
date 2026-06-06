const CURRENT_TRIP_STORAGE_KEY = "holiday_companion_current_trip";

export function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function saveTripToStorage<TTrip>(trip: TTrip): void {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.setItem(CURRENT_TRIP_STORAGE_KEY, JSON.stringify(trip));
  } catch (error) {
    console.warn("Could not save trip to localStorage.", error);
  }
}

export function loadTripFromStorage<TTrip>(): TTrip | null {
  if (!canUseLocalStorage()) return null;

  try {
    const savedTrip = window.localStorage.getItem(CURRENT_TRIP_STORAGE_KEY);

    if (!savedTrip) {
      return null;
    }

    return JSON.parse(savedTrip) as TTrip;
  } catch (error) {
    console.warn("Could not load trip from localStorage. Clearing saved trip.", error);
    clearTripStorage();
    return null;
  }
}

export function clearTripStorage(): void {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.removeItem(CURRENT_TRIP_STORAGE_KEY);
  } catch (error) {
    console.warn("Could not clear trip from localStorage.", error);
  }
}

export function hasSavedTrip(): boolean {
  if (!canUseLocalStorage()) return false;

  return window.localStorage.getItem(CURRENT_TRIP_STORAGE_KEY) !== null;
}
