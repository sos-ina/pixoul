export default function Hero({
  videoSrc,
  imageSrc,
  overlay = true,
  height = "min-h-screen",
  children,
}) {
  return (
    <section className={`relative w-full ${height} overflow-hidden flex items-center justify-center`}>
      
      {/* Background video */}
      {videoSrc && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      )}

      {/* Background image */}
      {!videoSrc && imageSrc && (
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      {/* dark:bg-black/60 bg-black/60 */}
      {overlay && (
        <div className="absolute inset-0 " />
      )}

      {/* Content (YOU control this) */}
      {children && (
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4 md:px-6 lg:px-8">
          {children}
        </div>
      )}
    </section>
  );
}
