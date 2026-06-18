import { useEffect, useState, type RefObject } from "react";
import { SCROLL_OFFSET } from "@/config/layout";

export type TocHeading = {
  id: string;
  text: string;
  level: number;
};

const sameHeadings = (a: TocHeading[], b: TocHeading[]) =>
  a.length === b.length &&
  a.every((h, i) => h.id === b[i].id && h.text === b[i].text);

/**
 * Extracts `<h2>`/`<h3>` headings from a content container to build the
 * "On this page" table of contents, and tracks the currently visible heading
 * via an IntersectionObserver (scroll-spy).
 *
 * A MutationObserver (debounced with rAF) rebuilds the list when the
 * container's content changes, so it keeps working with lazily-loaded MDX
 * pages and survives color-mode re-renders.
 *
 * @param containerRef ref to the element wrapping the rendered page content
 * @param key          value that changes on navigation (e.g. `location.pathname`)
 */
export function useHeadings(
  containerRef: RefObject<HTMLElement | null>,
  key: string
) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // New page: clear the active heading so a stale id can't carry over when
    // two pages happen to share a heading id (rehype-slug derives ids from text).
    setActiveId("");

    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const build = () => {
      const nodes = Array.from(
        container.querySelectorAll<HTMLHeadingElement>("h2, h3")
      ).filter((node) => node.id);

      const next = nodes.map((node) => ({
        id: node.id,
        text: node.textContent ?? "",
        level: Number(node.tagName[1]),
      }));
      setHeadings((prev) => (sameHeadings(prev, next) ? prev : next));

      observer?.disconnect();
      if (nodes.length === 0) return;

      setActiveId((prev) =>
        prev && nodes.some((n) => n.id === prev) ? prev : nodes[0].id
      );

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
            );
          if (visible[0]) setActiveId(visible[0].target.id);
        },
        { rootMargin: `-${SCROLL_OFFSET}px 0px -70% 0px`, threshold: [0, 1] }
      );
      nodes.forEach((node) => observer?.observe(node));
    };

    const scheduleBuild = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(build);
    };

    build();

    const mutationObserver = new MutationObserver(scheduleBuild);
    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, [containerRef, key]);

  return { headings, activeId };
}
