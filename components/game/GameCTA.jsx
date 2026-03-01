import AddToSessionButton from '@/components/cart/AddToSession';
import Link from 'next/link';

export default function GameCTA({ experience }) {
  return (
    <div className='flex flex-col items-center'>
    <section className="py-6 sm:py-8 flex items-center justify-center">
      <AddToSessionButton
        experience={experience}
        className="px-5 py-4 text-base sm:text-lg align-center"
      />
    </section>
    <p className="justify-center text-[#38C2D9] hover:underline font-semibold px-10 py-4">
      <Link href="/experience/vr">← Back to VR Experience Page</Link></p>
    </div>
  );
}
