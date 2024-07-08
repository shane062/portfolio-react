import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-4 content-center min-h-[calc(100vh-160px)] sm:p-0 p-4">
          <div className="col-span-12 text-justify content-center sm:col-span-4 sm:col-end-7">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Hello, <br />I'm Lai Weng Hong</h1>
            <p className="text-xl text-muted-foreground">
              A modal dialog that interrupts the user with important content and expects
              a response.
            </p>
          </div>

        <div className="flex col-span-12 flex items-center justify-center align-center sm:col-span-4 sm:col-start-7">
          <Image
            src="/images/lai-weng-hong.png"
            alt="Lai Weng Hong Profile Picture"
            className="bg-gradient-to-r from-cyan-500 to-blue-500"
            width={400}
            height={400}
            priority={true}
            quality={100}
          />
        </div>

    </div>
  );
}
