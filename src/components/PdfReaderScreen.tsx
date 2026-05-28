import { Viewer, Worker } from '@react-pdf-viewer/core';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import { toolbarPlugin, type ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { Download, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

const pdfWorkerUrl = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

interface PdfReaderScreenProps {
  fileUrl: string;
  title: string;
  onClose: () => void;
}

function PdfViewerPane({ fileUrl }: { fileUrl: string }) {
  const toolbarPluginInstance = useMemo(() => toolbarPlugin(), []);
  const pageNavigationPluginInstance = useMemo(() => pageNavigationPlugin(), []);
  const zoomPluginInstance = useMemo(() => zoomPlugin(), []);
  const scrollModePluginInstance = useMemo(() => scrollModePlugin(), []);

  const { Toolbar } = toolbarPluginInstance;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="shrink-0 border-b border-white/10 bg-[#323639] px-2 py-1">
        <Toolbar>
          {(slots: ToolbarSlot) => {
            const {
              CurrentPageInput,
              GoToNextPage,
              GoToPreviousPage,
              NumberOfPages,
              ZoomIn,
              ZoomOut,
              Zoom,
            } = slots;
            return (
              <div className="flex flex-wrap items-center gap-2 text-white text-sm">
                <div className="flex items-center gap-1">
                  <GoToPreviousPage />
                  <CurrentPageInput />
                  <span className="text-white/70">
                    / <NumberOfPages />
                  </span>
                  <GoToNextPage />
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <ZoomOut />
                  <Zoom />
                  <ZoomIn />
                </div>
              </div>
            );
          }}
        </Toolbar>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <Viewer
          fileUrl={fileUrl}
          plugins={[
            toolbarPluginInstance,
            pageNavigationPluginInstance,
            zoomPluginInstance,
            scrollModePluginInstance,
          ]}
        />
      </div>
    </div>
  );
}

export function PdfReaderScreen({ fileUrl, title, onClose }: PdfReaderScreenProps) {
  const [active, setActive] = useState(true);
  const closingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setActive(false);
    window.setTimeout(() => {
      onClose();
    }, 50);
  }, [onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  if (!active) return null;

  return (
    <div
      className="pdf-reader-root fixed inset-0 z-[300] flex flex-col bg-[#3c4043]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <header className="pdf-reader-toolbar flex items-center gap-1 shrink-0 bg-[#3c4043] text-white border-b border-white/10 px-2 pb-2">
        <button
          type="button"
          onClick={handleClose}
          className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full hover:bg-white/10 active:bg-white/20 touch-manipulation"
          aria-label="Close reader"
        >
          <X className="w-6 h-6" strokeWidth={2} />
        </button>
        <h1 className="flex-1 text-sm sm:text-base font-medium truncate px-1 leading-tight">{title}</h1>
        <a
          href={fileUrl}
          download
          className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full hover:bg-white/10 active:bg-white/20 touch-manipulation"
          aria-label="Download PDF"
        >
          <Download className="w-5 h-5" />
        </a>
      </header>

      <div className="pdf-reader-body flex-1 min-h-0 w-full overflow-hidden bg-[#525659]">
        <Worker workerUrl={pdfWorkerUrl}>
          <PdfViewerPane key={fileUrl} fileUrl={fileUrl} />
        </Worker>
      </div>
    </div>
  );
}
