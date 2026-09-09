import React from 'react';
import { CellPattern } from '../../types';

interface PatternCellProps {
  pattern: CellPattern;
  onClick?: () => void;
  color?: string; // e.g. '#E24A2F'
  bgColor?: string; // e.g. '#CAD7CA'
  sizeClass?: string;
  isInteractive?: boolean;
  hasError?: boolean;
}

export const PatternCell: React.FC<PatternCellProps> = ({
  pattern,
  onClick,
  color = '#E64A19',
  bgColor = '#EFF6EF',
  sizeClass = 'w-full h-full aspect-square',
  isInteractive = true,
  hasError = false,
}) => {
  const isButton = Boolean(isInteractive && onClick);

  const containerClasses = `relative ${sizeClass} overflow-hidden rounded-lg sm:rounded-xl border border-slate-300 shadow-xs select-none transition-all ${
    isButton
      ? 'cursor-pointer active:scale-95 hover:shadow-md hover:border-amber-400'
      : 'cursor-default'
  } ${hasError ? 'ring-3 ring-rose-500 ring-offset-1 animate-pulse' : ''}`;

  const svgContent = (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full block"
      preserveAspectRatio="none"
    >
      {/* Full solid fill */}
      {pattern === 'solid' && (
        <rect x="0" y="0" width="100" height="100" fill={color} />
      )}

      {/* Top-Left Triangle */}
      {pattern === 'tl' && (
        <polygon points="0,0 100,0 0,100" fill={color} />
      )}

      {/* Top-Right Triangle */}
      {pattern === 'tr' && (
        <polygon points="0,0 100,0 100,100" fill={color} />
      )}

      {/* Bottom-Left Triangle */}
      {pattern === 'bl' && (
        <polygon points="0,0 0,100 100,100" fill={color} />
      )}

      {/* Bottom-Right Triangle */}
      {pattern === 'br' && (
        <polygon points="100,0 100,100 0,100" fill={color} />
      )}

      {/* Light subtle guide line */}
      <line
        x1="0"
        y1={pattern === 'tl' || pattern === 'br' ? '100' : '0'}
        x2="100"
        y2={pattern === 'tl' || pattern === 'br' ? '0' : '100'}
        stroke="rgba(0, 0, 0, 0.12)"
        strokeWidth="1.5"
        strokeDasharray="3,3"
      />
    </svg>
  );

  if (isButton) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={containerClasses}
        style={{ backgroundColor: bgColor }}
      >
        {svgContent}
      </button>
    );
  }

  return (
    <div
      className={containerClasses}
      style={{ backgroundColor: bgColor }}
    >
      {svgContent}
    </div>
  );
};
