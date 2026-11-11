import { ReactNode, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from './Icons';
import { hasFinePointer, prefersReducedMotion } from '../lib/env';

type Common = {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'sm';
  className?: string;
  icon?: ReactNode;
  magnetic?: boolean;
  cursor?: string;
};

type Props = Common &
  ({ onClick: () => void; to?: never; href?: never } | { to: string; onClick?: never; href?: never } | { href: string; onClick?: never; to?: never });

/** Pulls an element slightly toward the pointer. Pointer handlers only write; rAF does the work. */
export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

export function Button(props: Props) {
  const { children, variant = 'primary', size = 'md', className = '', icon, magnetic = true, cursor } = props;
  const wrap = useMagnetic<HTMLSpanElement>(magnetic ? 0.22 : 0);
  const cls = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${size === 'sm' ? 'btn-sm' : ''} ${className}`;
  const inner = (
    <>
      <span className="relative">{children}</span>
      {variant === 'primary' ? (
        <span className="btn-icon">
          {icon ?? <ArrowUpRight />}
          {icon ?? <ArrowUpRight />}
        </span>
      ) : (
        icon
      )}
    </>
  );

  let el: ReactNode;
  if ('to' in props && props.to) {
    el = (
      <Link to={props.to} className={cls} data-cursor={cursor ? 'label' : 'hover'} data-cursor-label={cursor} viewTransition>
        {inner}
      </Link>
    );
  } else if ('href' in props && props.href) {
    el = (
      <a href={props.href} className={cls} target="_blank" rel="noreferrer" data-cursor="hover">
        {inner}
      </a>
    );
  } else {
    el = (
      <button type="button" onClick={props.onClick} className={cls} data-cursor="hover">
        {inner}
      </button>
    );
  }
  return (
    <span ref={wrap} className="inline-flex">
      {el}
    </span>
  );
}
