import { useLayoutEffect, useRef } from "react";

export const RenderLifeCycle = ({ firstRender, updateRender, lastRender }) => {
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (!isFirstRender.current) {
      updateRender && updateRender();
    }
  });

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      firstRender && firstRender();
    }

    return () => {
      lastRender && lastRender();
    };
  }, [firstRender, lastRender]);
};
