// Utility for mobile haptic feedback
export function triggerHaptic(type: 'light' | 'medium' | 'success' = 'light') {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) return;
  try {
    if (type === 'light') {
      navigator.vibrate(12);
    } else if (type === 'medium') {
      navigator.vibrate(25);
    } else if (type === 'success') {
      navigator.vibrate([20, 60, 30]);
    }
  } catch {}
}
