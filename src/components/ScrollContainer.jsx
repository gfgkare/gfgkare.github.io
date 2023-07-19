import React, { useRef, useEffect } from "react";
import {
  setTransform,
  setStyles,
  updateElements,
  createBlock,
  reCalculateBlocks
} from "./utilities";

export const ScrollContext = React.createContext();

export default props => {
  const spacer = useRef(null);
  const container = useRef(null);
  const blocks = useRef([]);
  const ease = 0.03;
  let yCurrent = 0;
  let yScroll = 0;
  let animationFrame;

  const updateScroll = () => {
    yScroll = window.scrollY || window.pageYOffset;
    startAnimation();
  };

  const startAnimation = () => {
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animate);
    }
  };

  const cancelAnimation = () => {
    yCurrent = yScroll;
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  };

  const animate = () => {
    const diff = yScroll - yCurrent;
    const delta = Math.abs(diff) < 0.1 ? 0 : diff * ease;
    if (delta) {
      yCurrent += delta;
      yCurrent = parseFloat(yCurrent.toFixed(2));
      animationFrame = requestAnimationFrame(animate);
    } else {
      cancelAnimation();
    }
    setTransform(container.current, "translateY(" + -yCurrent + "px)");
    updateElements(blocks.current, yCurrent);
  };

  const init = () => {
    yScroll = window.scrollY || window.pageYOffset;
    yCurrent = yScroll;
    setStyles(spacer.current, container.current);
    startAnimation();
  };

  const resize = () => {
    yScroll = window.scrollY || window.pageYOffset;
    yCurrent = yScroll;
    setStyles(spacer.current, container.current);
    blocks.current = reCalculateBlocks(blocks.current, container.current);
    startAnimation();
  };

  useEffect(() => {
    init();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  const addBlock = data => {
    blocks.current = [...blocks.current, createBlock(data, container.current)];
  };

  return (
    <ScrollContext.Provider value={{ addBlock }}>
      <>
        <div ref={spacer} />
        <div ref={container}>{props.children}</div>
      </>
    </ScrollContext.Provider>
  );
};
