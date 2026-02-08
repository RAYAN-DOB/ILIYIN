/**
 * Skeleton affiché pendant le chargement de ParticleBackground (Three.js).
 */
export default function ParticleBackgroundSkeleton() {
  return (
    <div
      className="fixed inset-0 -z-10 bg-space-black"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-space-gray/30 to-space-black animate-pulse" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-green/20 via-transparent to-transparent" />
    </div>
  );
}
