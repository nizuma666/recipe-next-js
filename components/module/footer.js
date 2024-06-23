export default function Footer() {
  return (
    <div className="bg-leery-lemon h-[685px] max-lg:h-96 flex flex-col justify-between">
      <div className="flex flex-col justify-center items-center py-8 box-border flex-grow">
        <div className="text-center">
          <p className="text-navy text-7xl max-md:text-3xl max-lg:text-4xl">Eat, Cook, Repeat</p>
          <p className="text-navy text-2xl max-lg:text-xl">Share your best recipe by uploading here !</p>
        </div>
      </div>
      <div className="text-navy text-lg text-center py-4 max-md:text-sm font-semibold">
        <p>Product &nbsp;&nbsp;&nbsp; Company &nbsp;&nbsp;&nbsp; Learn more &nbsp;&nbsp;&nbsp; Get in touch</p>
      </div>
    </div>
  );
}
