import { useState, useMemo, useCallback, RefObject, MouseEvent } from 'react';

type State = {
  opacity: number;
  transformX: number;
  transformY: number;
  transformScale: number;
  transitionDuration: number;
  effectDuration: number;
};

const defaultState: State = {
  opacity: 0,
  transformX: 0,
  transformY: 0,
  transformScale: 1,
  transitionDuration: 0,
  effectDuration: 750,
};

export function useRippleEffect(ref: RefObject<HTMLElement>) {
  const [state, update] = useState<State>(defaultState);
  const tx = useMemo(() => `translateX(${state.transformX}px)`, [
    state.transformX,
  ]);
  const ty = useMemo(() => `translateY(${state.transformY}px)`, [
    state.transformY,
  ]);
  const ts = useMemo(() => `scale(${state.transformScale})`, [
    state.transformScale,
  ]);
  const effectStyle = useMemo(
    () => ({
      opacity: state.opacity,
      transform: `${tx} ${ty} ${ts}`,
      transitionDuration: `${state.transitionDuration / 1000}s`,
    }),
    [state.opacity, tx, ty, ts, state.transitionDuration]
  );
  const handleMouseDown = useCallback((event: MouseEvent<HTMLElement>) => {
    event.persist();
    update((_state) => {
      if (ref.current === null) return _state;
      const clickX = event.pageX;
      const clickY = event.pageY;
      const clientRect = ref.current.getBoundingClientRect();
      const positionX = clientRect.left + window.pageXOffset;
      const positionY = clientRect.top + window.pageYOffset;
      const transformX = clickX - positionX;
      const transformY = clickY - positionY;
      return {
        ..._state,
        opacity: 0.3,
        transformX,
        transformY,
        transformScale: 0,
        transitionDuration: 0,
      };
    });
  }, []);
  const handleMouseUp = useCallback((event: MouseEvent<HTMLElement>) => {
    event.persist();
    update((_state) => ({
      ..._state,
      opacity: 0,
      transformScale: 1,
      transitionDuration: _state.effectDuration,
    }));
  }, []);
  return {
    handleMouseDown,
    handleMouseUp,
    effectStyle,
  };
}
