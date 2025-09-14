/**
 * Utility function to concatenate class names conditionally
 * Similar to clsx but simpler for React Native/NativeWind usage
 */

type ClassValue = string | number | boolean | undefined | null;

export function cn(...classes: ClassValue[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim();
}