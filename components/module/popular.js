export default function Popular() {
  return (
    <div className="max-lg:mb-9">
      <div className="border-l-[25px] border-solid border-l-leery-lemon max-lg:border-none h-32 flex items-center max-lg:justify-center max-lg:mb-2 mb-12 mx-14">
        <p className="text-5xl text-navy ml-7 max-lg:text-center max-lg:text-4xl">Popular For You !</p>
      </div>
      <div className="mb-4 max-lg:hidden">
        <img src="/assets/vectorHorizontal.png" />
      </div>
      <div className="flex flex-wrap gap-5 mb-4 max-lg:justify-evenly max-md:gap-0">
        <div className=" relative">
          <img className=" w-96 h-96 max-md:w-48 max-md:h-48 max-lg:w-56 max-lg:h-56" src="/assets/pizza.png" />
          <div className=" absolute bottom-12 left-10 text-5xl text-white w-36 max-lg:text-2xl max-lg:left-4">
            <p>Pizza Lamoa</p>
          </div>
        </div>
        <div className=" relative">
          <img className=" w-96 h-96 max-md:w-48 max-md:h-48 max-lg:w-56 max-lg:h-56" src="/assets/hamburger.png" />
          <div className="absolute bottom-12 left-10 text-5xl text-white text-wrap w-36 max-lg:text-2xl max-lg:left-4">
            <p>King Burger</p>
          </div>
        </div>
        <img src="/assets/vectorVertical.png" className="max-lg:hidden"/>
      </div>
      <div className="flex justify-center mr-36 mb-56 max-lg:hidden">
        <img src="/assets/vectorHorizontal2.png" />
      </div>
    </div>

    // <div className="max-lg:mb-9">
    //   <div className="border-l-[25px] border-solid border-l-leery-lemon max-lg:border-none h-32 flex items-center justify-center max-lg:mb-2 mb-12 mx-14">
    //     <p className="text-4xl lg:text-5xl text-navy ml-7">Popular For You !</p>
    //   </div>
    //   <div className="mb-4 max-lg:hidden">
    //     <img src="/assets/vectorHorizontal.png" alt="Vector Horizontal" />
    //   </div>
    //   <div className="flex flex-col lg:flex-row gap-5 mb-4 max-w-full max-lg:justify-center mx-14">
    //     <div className="relative">
    //       <img className="w-full lg:w-96 h-auto max-h-96 max-lg:w-72 max-lg:h-72" src="/assets/pizza.png" alt="Pizza" />
    //       <div className="absolute bottom-12 left-10 text-4xl lg:text-5xl text-white w-36">
    //         <p>Pizza Lamoa</p>
    //       </div>
    //     </div>
    //     <div className="relative">
    //       <img className="w-full lg:w-96 h-auto max-h-96 max-lg:w-72 max-lg:h-72" src="/assets/hamburger.png" alt="Hamburger" />
    //       <div className="absolute bottom-12 left-10 text-4xl lg:text-5xl text-white w-36">
    //         <p>King Burger</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex justify-center items-end mr-14 mb-6 max-lg:hidden">
    //     <img src="/assets/vectorVertical.png" alt="Vector Vertical" />
    //   </div>
    //   <div className="flex justify-center max-lg:hidden">
    //     <img src="/assets/vectorHorizontal2.png" alt="Vector Horizontal 2" />
    //   </div>
    // </div>
  );
}
