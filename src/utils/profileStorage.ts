import { UserProfile } from '../types';

export const PROFILE_KEY = 'nafas_qadam_profile_v2';
export const PROFILES_LIST_KEY = 'nafas_qadam_profiles_list_v2';

/**
 * Loads all saved profiles from localStorage.
 * Automatically migrates single existing profile into the list if needed.
 */
export function getAllProfiles(): UserProfile[] {
  if (typeof window === 'undefined') return [];

  try {
    const listRaw = localStorage.getItem(PROFILES_LIST_KEY);
    if (listRaw) {
      const parsed = JSON.parse(listRaw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    // Fallback: Check single existing profile
    const singleRaw = localStorage.getItem(PROFILE_KEY);
    if (singleRaw) {
      const single = JSON.parse(singleRaw) as UserProfile;
      if (single && single.firstName) {
        if (!single.id) single.id = 'kid-' + Date.now();
        localStorage.setItem(PROFILES_LIST_KEY, JSON.stringify([single]));
        return [single];
      }
    }
  } catch {
    // Fallback gracefully
  }

  return [];
}

/**
 * Loads the currently active profile
 */
export function getActiveProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;

  try {
    const singleRaw = localStorage.getItem(PROFILE_KEY);
    if (singleRaw) {
      const single = JSON.parse(singleRaw) as UserProfile;
      if (single && single.firstName) {
        if (!single.id) single.id = 'kid-' + Date.now();
        return single;
      }
    }

    const all = getAllProfiles();
    if (all.length > 0) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(all[0]));
      return all[0];
    }
  } catch {
    // Fallback
  }

  return null;
}

/**
 * Saves or updates a profile in the list, and sets it as the active profile.
 */
export function saveProfile(profile: UserProfile): {
  activeProfile: UserProfile;
  allProfiles: UserProfile[];
} {
  const profileToSave: UserProfile = {
    ...profile,
    id: profile.id || 'kid-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: profile.createdAt || new Date().toISOString(),
  };

  try {
    const existing = getAllProfiles();
    const index = existing.findIndex((p) => p.id === profileToSave.id);

    let updatedList: UserProfile[];
    if (index >= 0) {
      updatedList = [...existing];
      updatedList[index] = profileToSave;
    } else {
      updatedList = [...existing, profileToSave];
    }

    localStorage.setItem(PROFILES_LIST_KEY, JSON.stringify(updatedList));
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profileToSave));

    return { activeProfile: profileToSave, allProfiles: updatedList };
  } catch {
    return { activeProfile: profileToSave, allProfiles: [profileToSave] };
  }
}

/**
 * Switches the active profile to one of the existing profiles by ID.
 */
export function switchActiveProfile(profileId: string): UserProfile | null {
  const all = getAllProfiles();
  const target = all.find((p) => p.id === profileId);
  if (target) {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(target));
    } catch {
      // Ignore
    }
    return target;
  }
  return null;
}

/**
 * Deletes a profile by ID
 */
export function deleteProfile(profileId: string): {
  remainingProfiles: UserProfile[];
  newActive: UserProfile | null;
} {
  try {
    const existing = getAllProfiles();
    const updated = existing.filter((p) => p.id !== profileId);
    localStorage.setItem(PROFILES_LIST_KEY, JSON.stringify(updated));

    const active = getActiveProfile();
    let newActive: UserProfile | null = active;

    if (active?.id === profileId) {
      newActive = updated.length > 0 ? updated[0] : null;
      if (newActive) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(newActive));
      } else {
        localStorage.removeItem(PROFILE_KEY);
      }
    }

    return { remainingProfiles: updated, newActive };
  } catch {
    return { remainingProfiles: [], newActive: null };
  }
}
