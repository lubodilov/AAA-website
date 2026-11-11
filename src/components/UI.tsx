import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Close } from './Icons';
import { lockScroll } from '../lib/scroll';
import { BookingPanel, preloadCalendly } from './Booking';
import { ContactPanel } from './Contact';
import { useT } from '../content';

type Panel = 'booking' | 'contact' | null;
type Ctx = { open: (p: Exclude<Panel, null>) => void; close: () => void; panel: Panel; warm: () => void };

const UICtx = createContext<Ctx>({ open: () => {}, close: () => {}, panel: null, warm: () => {} });
export const useUI = () => useContext(UICtx);

export function UIProvider({ children }: { children: ReactNode }) {
  const copy = useT().ui.modal;
  const [panel, setPanel] = useState<Panel>(null);
  const open = useCallback((p: Exclude<Panel, null>) => setPanel(p), []);
  const close = useCallback(() => setPanel(null), []);
  const value = useMemo(() => ({ open, close, panel, warm: preloadCalendly }), [open, close, panel]);
  return (
    <UICtx.Provider value={value}>
      {children}
      <Modal open={panel === 'booking'} onClose={close} label={copy.booking} wide>
        <BookingPanel onSwitch={() => setPanel('contact')} />
      </Modal>
      <Modal open={panel === 'contact'} onClose={close} label={copy.contact}>
        <ContactPanel onSwitch={() => setPanel('booking')} />
      </Modal>
    </UICtx.Provider>
  );
}

function Modal({
  open,
  onClose,
  label,
  wide,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  wide?: boolean;
  children: ReactNode;
}) {
  const closeLabel = useT().ui.modal.close;
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement;
      setMounted(true);
      lockScroll(true);
      document.documentElement.classList.add('modal-open');
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(id);
    }
    if (mounted) {
      setVisible(false);
      lockScroll(false);
      document.documentElement.classList.remove('modal-open');
      const t = setTimeout(() => {
        setMounted(false);
        returnFocus.current?.focus?.();
      }, 340);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!visible) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, iframe, [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[150] flex items-end md:items-center justify-center md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      data-lenis-prevent
    >
      <div
        className="absolute inset-0 bg-[rgba(22,19,15,0.55)] transition-opacity duration-300 ease-out"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative w-full ${wide ? 'md:max-w-[1120px]' : 'md:max-w-[640px]'} max-h-[94svh] overflow-y-auto overscroll-contain bg-paper outline-none md:max-h-[90vh]`}
        style={{ transition: 'transform 0.35s var(--ease-out), opacity 0.25s ease', transform: visible ? 'none' : 'translateY(16px)', opacity: visible ? 1 : 0 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center text-char transition-colors hover:text-char"
          aria-label={closeLabel}
            >
          <Close />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
