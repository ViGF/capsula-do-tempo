import Image from 'next/image'

import nlwLogo from '../assets/nlw-spacetime-logo.svg'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="mx-auto space-y-5 text-center lg:mx-0 lg:text-left">
      <Image
        src={nlwLogo}
        alt="nlw spacetime logo"
        className="mx-auto lg:mx-0"
      />
      <div className="max-w-[420px] space-y-5">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
        <Link
          href="/memories/new#form"
          className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        >
          CADASTRAR LEMBRANçA
        </Link>
      </div>
    </div>
  )
}
