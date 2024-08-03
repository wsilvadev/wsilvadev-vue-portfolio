// src/utils/renderReactComponent.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import CanvasComponent from './index';

/**
 * Renderiza um componente React no elemento alvo.
 *
 * @param {HTMLElement} targetEl - O elemento DOM onde o componente será renderizado.
 */
export function renderReactComponent(targetEl) {
  if (!targetEl || !(targetEl instanceof HTMLElement)) {
    throw new Error('O elemento alvo para renderização não foi fornecido.');
  }

  const root = createRoot(targetEl);
  root.render(<CanvasComponent />);
}
