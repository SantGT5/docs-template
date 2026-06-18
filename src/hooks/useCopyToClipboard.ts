import { useCallback, useRef, useState } from "react";

/**
 * Copies text to the clipboard and exposes a transient `copied` flag that
 * flips back to `false` after `timeout` ms — handy for "Copy → Copied!" buttons.
 */
export function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), timeout);
      } catch {
        setCopied(false);
      }
    },
    [timeout]
  );

  return { copied, copy };
}
