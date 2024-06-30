import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-12 content-center h-[calc(100vh-64px)]">
          <div className="col-span-4 col-end-7">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Hello, <br />I'm Lai Weng Hong</h1>
            <p className="text-xl text-muted-foreground">
              A modal dialog that interrupts the user with important content and expects
              a response.
            </p>
          </div>

        <div className="col-span-4 col-start-7 flex items-center align-center">
          <Image
            src="/vercel.svg"
            alt="Lai Weng Hong Profile Picture"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 p-10"
            width={500}
            height={500}
            priority
          />
        </div>

    </div>
  );
}
