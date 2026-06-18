import { IconButton } from "@chakra-ui/react";
import { LuCheck, LuCopy } from "react-icons/lu";
import { Tooltip } from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface CopyButtonProps {
  /** The text placed on the clipboard when clicked. */
  value: string;
  size?: "2xs" | "xs" | "sm" | "md";
  "aria-label"?: string;
}

/**
 * A small icon button that copies `value` to the clipboard and briefly shows a
 * check mark as confirmation. Used by `CodeBox` and `CommandBox`.
 */
export function CopyButton({
  value,
  size = "sm",
  "aria-label": ariaLabel = "Copy to clipboard",
}: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Tooltip content={copied ? "Copied!" : "Copy"} openDelay={200} closeDelay={100}>
      <IconButton
        aria-label={ariaLabel}
        size={size}
        variant="ghost"
        color={copied ? "green.fg" : "fg.muted"}
        onClick={() => copy(value)}
        _hover={{ color: copied ? "green.fg" : "fg" }}
      >
        {copied ? <LuCheck /> : <LuCopy />}
      </IconButton>
    </Tooltip>
  );
}
