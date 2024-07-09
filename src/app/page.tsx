import Image from "next/image";


export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-4 content-center min-h-[calc(100vh-160px)] md:p-0 p-4">
      <div className="col-span-12 text-justify content-center md:col-span-4 md:col-end-7 mb-4 md:mb-0 mr-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Hello, <br />I'm Lai Weng Hong</h1>
        <p className="text-xl text-muted-foreground">
          A modal dialog that interrupts the user with important content and expects
          a response.
        </p>
      </div>

      <div className="relative flex col-span-8 justify-center items-center md:col-span-4 col-start-3 md:col-start-7 group mb-8 md:mb-0">
        {/* Background Box */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-blue-600 to-teal-400 rounded-lg transform translate-x-6 translate-y-6 -z-10 transition-transform duration-300 ease-in-out group-hover:translate-x-2 group-hover:translate-y-2"></div>

        <div className="rounded-lg relative">
          <Image
            src="/images/lai-weng-hong.png"
            alt="Lai Weng Hong Profile Picture"
            className="bg-neon-pink rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
            width={375}
            height={375}
            priority={true}
            quality={100}
          />
          {/* Foreground Box */}
          <div className="absolute inset-0 border-4 border-neon-yellow rounded-lg -translate-x-6 -translate-y-6 transition-transform duration-300 ease-in-out group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
        </div>
      </div>




    </div>
  );
}
