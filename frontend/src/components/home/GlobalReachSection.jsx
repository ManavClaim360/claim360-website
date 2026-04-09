export default function GlobalReachSection() {
  return (
    <section className="relative overflow-hidden bg-[#f6f1e2] py-14 lg:py-20">
      <div className="c">
        <div className="text-center mb-8 lg:mb-12">
          <div
            className="inline-block text-[#2e4a88] text-[3.25rem] sm:text-[4.25rem] lg:text-[5.25rem] leading-none"
            style={{ fontFamily: '"Lavishly Yours", cursive' }}
          >
            from india to the world
          </div>
        </div>

        <div className="mx-auto max-w-5xl bg-[#f3ecd8]/60 px-4 py-6 lg:px-8 lg:py-8">
          <img
            src="/assets/map_img.png"
            alt="Global reach map"
            className="w-full h-auto object-contain opacity-82"
          />
        </div>
      </div>
    </section>
  )
}
