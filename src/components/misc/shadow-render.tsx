import { useShadowRoot } from "@/hooks/shadowRoot";
import { useRef, useEffect, StrictMode, PropsWithChildren } from "react";
import { Root, createRoot } from "react-dom/client";

const ShadowRender = (
  props: PropsWithChildren<{
    stylesheet?: string;
  }>
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Root | null>(null);
  const { setRootElement } = useShadowRoot();

  useEffect(() => {
    if (containerRef.current && !rootRef.current) {
      rootRef.current = createRoot(
        containerRef.current.attachShadow({ mode: "open" })
      );
      setRootElement(containerRef.current.shadowRoot!);
    }

    if (rootRef.current) {
      rootRef.current.render(
        <StrictMode>
          <style>{`:host { all: initial }`}</style>
          {props.stylesheet && <link rel="stylesheet" href={props.stylesheet} />}
          <div id="shadow-root">
            {props.children}
          </div>
        </StrictMode>
      );
    }
  }, [props.children, props.stylesheet]);

  return <div ref={containerRef} />;
};

export default ShadowRender;