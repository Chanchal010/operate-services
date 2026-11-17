interface OperateServicesLogoProps {
  variant?: 'dark' | 'light';
  size?: 'default' | 'lg';
  showText?: boolean;
  className?: string;
}

export function OperateServicesLogo({
  variant = 'dark',
  size = 'default',
  showText = true,
  className = '',
}: OperateServicesLogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#001C36]';
  const isLarge = size === 'lg';

  return (
    <span className={`inline-flex items-center gap-3 whitespace-nowrap shrink-0 ${className}`}>
      <picture className="shrink-0 flex items-center">
        <source srcSet="/images/operateservices_logo.webp" type="image/webp" />
        <img
          src="/images/operateservices_logo.png"
          alt="OperateServices Logo"
          width={isLarge ? 64 : 52}
          height={isLarge ? 36 : 29}
          className={`${
            isLarge ? 'h-9 sm:h-11' : 'h-7 sm:h-8'
          } w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
        />
      </picture>
      {showText && (
        <span
          className={`font-bold tracking-tight leading-none ${
            isLarge ? 'text-[28px] sm:text-[32px]' : 'text-[24px] sm:text-[27px]'
          } ${textColor}`}
        >
          OperateServices<sup className="text-[11px] font-medium ml-0.5 align-super">®</sup>
        </span>
      )}
    </span>
  );
}
