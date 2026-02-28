import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="font-science-gothic flex h-screen flex-col items-center p-24 text-yellow-400">
        <h1 className="text-xl pb-3">About</h1>
        <Image
          src="/xavierschool.png"
          width={700}
          height={350}
          alt="Picture of the author"
          className=" rounded-2xl object-none"
          loading="eager"
        />
        <p className="max-w-2xl text-lg leading-relaxed">
          Welcome to a sanctuary for the extraordinary. At Xavier&apos;s, we
          believe that what makes you different is what makes you strong. We are
          dedicated to fostering the next stage of human evolution in a safe,
          supportive environment where you can master your gifts and find your
          place in the world.
        </p>
      </div>
    </>
  );
}
