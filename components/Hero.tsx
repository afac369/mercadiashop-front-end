import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[480px] rounded-2xl overflow-hidden">
      <Image
        src="/bg-mercadiashop.jpg?v=2"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10" />
      <div className="relative z-10 px-6 py-10 md:px-12 text-white">
        {/* contenido */}
      </div>
    </section>
  );
}
