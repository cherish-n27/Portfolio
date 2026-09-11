/**
 * Image storage utility for real user-uploaded files only.
 * No AI generation, synthesis, or stock imagery is ever injected here.
 */

export const STORAGE_KEYS = {
  PROFILE_PHOTO: 'cherish_user_profile_photo',
  PROJECT_SCREENSHOT_PREFIX: 'cherish_user_project_img_',
  CERT_BADGE_PREFIX: 'cherish_user_cert_badge_',
  GALLERY_CUSTOM_ENTRIES: 'cherish_user_gallery_entries',
};

export function getUserProfilePhoto(): string {
  try {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(STORAGE_KEYS.PROFILE_PHOTO) || '';
  } catch {
    return '';
  }
}

export function setUserProfilePhoto(dataUrl: string): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PROFILE_PHOTO, dataUrl);
  } catch (err) {
    console.warn('Failed to store profile image in localStorage', err);
  }
}

export function removeUserProfilePhoto(): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PROFILE_PHOTO);
  } catch (err) {
    console.warn('Failed to remove profile photo', err);
  }
}

export function getProjectScreenshot(projectId: string): string {
  try {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(STORAGE_KEYS.PROJECT_SCREENSHOT_PREFIX + projectId) || '';
  } catch {
    return '';
  }
}

export function setProjectScreenshot(projectId: string, dataUrl: string): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PROJECT_SCREENSHOT_PREFIX + projectId, dataUrl);
  } catch (err) {
    console.warn('Failed to store project screenshot', err);
  }
}

export function removeProjectScreenshot(projectId: string): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PROJECT_SCREENSHOT_PREFIX + projectId);
  } catch (err) {
    console.warn('Failed to remove project screenshot', err);
  }
}

export function getCertBadge(certId: string): string {
  try {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(STORAGE_KEYS.CERT_BADGE_PREFIX + certId) || '';
  } catch {
    return '';
  }
}

export function setCertBadge(certId: string, dataUrl: string): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CERT_BADGE_PREFIX + certId, dataUrl);
  } catch (err) {
    console.warn('Failed to store cert badge', err);
  }
}

export function removeCertBadge(certId: string): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.CERT_BADGE_PREFIX + certId);
  } catch (err) {
    console.warn('Failed to remove cert badge', err);
  }
}
