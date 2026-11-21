import { useEffect, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK } from "../../lib/gsap";

/**
 * Page-wide decorative backdrop: columns of dim source code with a soft
 * "flashlight" that follows the cursor.
 *
 * Perf notes — the code text is painted once and only ever moves by transform
 * (scroll parallax). The light is a single radial-gradient on a separate,
 * text-free shade layer, so a pointer move repaints one gradient, never text.
 */

const BLOCKS: string[] = [
  `// portfolio.config.ts
export const developer = {
  name: "Kit Daniel Lim",
  role: "Full-stack Developer",
  based: "Cebu City, PH",
  years: 6,
  stack: ["React", "Node.js", "TypeScript"],
} as const;`,
  `async function ship(feature: Feature) {
  const build = await compile(feature);
  if (!build.ok) throw new BuildError(build.log);

  await test(build, { coverage: true });
  return deploy(build, "production");
}`,
  `export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - innerHeight;
      setProgress(max > 0 ? scrollY / max : 0);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}`,
  `router.get("/api/projects", async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const projects = await Project.findAll({
    where: { published: true },
    order: [["shippedAt", "DESC"]],
    limit: 12,
    offset: (page - 1) * 12,
  });
  res.json({ page, projects });
});`,
  `type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

const retry = async <T>(fn: () => Promise<T>, tries = 3) => {
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === tries - 1) throw err;
    }
  }
};`,
  `const Card = ({ title, children }: CardProps) => (
  <article className="card">
    <h3>{title}</h3>
    {children}
  </article>
);

export default memo(Card);`,
  `// keep it simple, keep it fast
const debounce = (fn: Fn, wait = 200) => {
  let timer: number | undefined;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};`,
];

const COLUMNS = 3;
const REPEATS = 3;

const TOKEN =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(const|let|export|default|function|async|await|return|if|for|try|catch|throw|new|type|as|import|from|true|false)\b|\b(\d+)\b/gm;

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const highlight = (source: string) => {
  let html = "";
  let last = 0;
  for (const match of source.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    html += escapeHtml(source.slice(last, index));
    const kind = match[1] ? "c" : match[2] ? "s" : match[3] ? "k" : "n";
    html += `<span class="tok-${kind}">${escapeHtml(match[0])}</span>`;
    last = index + match[0].length;
  }
  return html + escapeHtml(source.slice(last));
};

const CodeBackdrop = () => {
  const root = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);

  // Each column starts on a different block so the three don't line up.
  const columns = useMemo(
    () =>
      Array.from({ length: COLUMNS }, (_, column) => {
        const ordered = BLOCKS.map((_, i) => BLOCKS[(i + column * 2) % BLOCKS.length]);
        const source = Array.from({ length: REPEATS }, () => ordered.join("\n\n")).join("\n\n");
        return highlight(source);
      }),
    []
  );

  // Slow parallax drift of the code as the page scrolls.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.to(".codebg-code", {
          y: () => -window.innerHeight * 0.9,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.8, invalidateOnRefresh: true },
        });
      });
    },
    { scope: root }
  );

  // Flashlight: ease the light toward the cursor. Mouse / trackpad only —
  // touch devices keep the static light defined in CSS.
  useEffect(() => {
    const el = shade.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduced ? 1 : 0.14;
    let x = window.innerWidth * 0.72;
    let y = window.innerHeight * 0.3;
    let targetX = x;
    let targetY = y;
    let raf = 0;

    const step = () => {
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      el.style.setProperty("--mx", `${x.toFixed(1)}px`);
      el.style.setProperty("--my", `${y.toFixed(1)}px`);
      const settled = Math.abs(targetX - x) < 0.5 && Math.abs(targetY - y) < 0.5;
      raf = settled ? 0 : requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!raf) raf = requestAnimationFrame(step);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="codebg">
      <div className="codebg-code">
        {columns.map((html, index) => (
          <pre key={index} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </div>
      <div ref={shade} className="codebg-shade" />
    </div>
  );
};

export default CodeBackdrop;
