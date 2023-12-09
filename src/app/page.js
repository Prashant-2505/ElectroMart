import Image from "next/image"
import { Button } from "@nextui-org/react"
import laptop from '../../public/image/laptop.jpeg'
import phone from '../../public/image/phone.jpeg'
import headphone from '../../public/image/headphone.jpeg'
import earbud from '../../public/image/earbud.jpeg'


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col pt-[6.5rem] md:pt-[4.5rem]">

      {/* start */}

      <div className=" flex justify-between items-center">

        <div className=" w-[50vw] h-[80vh]  relative">
          <Image
            className=" object-cover w-full h-full "
            src={laptop} />
          <div className="absolute top-10 left-8">
            <h1 className=" text-3xl mb-5 font-bold "> Shop the Best</h1>
            <h1 className=" text-3xl font-bold "> Laptops Now !</h1>

            <p className="mt-8 text-semibold">Pair text with an icon to focus on</p>
            <p className="text-semibold">your store's features</p>

            <Button className=" bg-white mt-7 p-6 text">
              Show Now
            </Button>
          </div>
        </div>

        <div className="w-[30vw] h-[80vh] cursor-pointer">
          <Image src={phone} className="h-[70%]" />
          <h1 className="font-bold p-3 text-xl">Best Smartphone</h1>
          <h1 className="font-bold p-3 text-xl">In Your Range !</h1>
        </div>


        <div className="w-[20vw] h-[80vh] flex flex-col">
          <div className=" h-[40vh] w-full relative cursor-pointer">
            <Image src={headphone} className=" object-cover " />
            <p className="absolute bottom-7 left-3 font-semibold  rounded-md p-2 bg-slate-50 opacity-70">Play now</p>
          </div>
          <div className=" h-[40vh] w-full relative cursor-pointer">
            <Image src={earbud} className=" object-cover w-full h-full" />
            <p className="absolute bottom-7 left-3 font-semibold  rounded-md p-2 bg-slate-50 opacity-70">Explore Our New Earbuds</p>
          </div>
        </div>

      </div>
    </main>
  )
}
