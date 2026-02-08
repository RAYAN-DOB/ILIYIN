/**
 * Extension des types JSX pour les éléments Three.js (group, points, mesh, etc.)
 * requis par @react-three/fiber.
 */
import type { ThreeElements } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
