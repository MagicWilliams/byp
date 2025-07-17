import Image from 'next/image';
import Link from 'next/link';

interface IconProps {
  name: string;
  imagePath: string;
  width?: number;
  height?: number;
  href?: string;
  className?: string;
}

export default function Icon({
  name,
  imagePath,
  width = 24,
  height = 24,
  href,
  className = 'flex flex-col items-center space-y-2',
}: IconProps) {
  const iconContent = (
    <>
      <Image src={imagePath} alt={name} width={width} height={height} />
      <span>{name}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {iconContent}
      </Link>
    );
  }

  return <div className={className}>{iconContent}</div>;
}
