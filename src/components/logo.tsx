import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href='/' className='flex w-fit items-center gap-2.5'>
      {/* `db.` symbol mark — decorative; the wordmark carries the accessible name. */}
      <Image
        src='/brand/detailbusiness-symbol.png'
        width={792}
        height={528}
        priority
        quality={100}
        className='h-8 w-auto'
        alt=''
      />
      <Image
        src='/brand/detailbusiness-wordmark-inverse.png'
        width={1488}
        height={366}
        priority
        quality={100}
        className='h-8 w-auto'
        alt='DetailBusiness.com'
      />
    </Link>
  );
}
