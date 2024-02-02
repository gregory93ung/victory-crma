import { useTheme } from './theme-provider';

export const LogoIcon = () => {
  const { theme } = useTheme();

  const getEffectiveTheme = () => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      return systemTheme;
    }
    return theme;
  };

  const effectiveTheme = getEffectiveTheme();

  const fill = effectiveTheme === 'dark' ? 'white' : 'black';

  return (
    <svg
      width='42'
      height='34'
      viewBox='0 0 42 34'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='p-2'
    >
      <g clipPath='url(#clip0_3015_97)'>
        <path
          d='M20.0039 34L42 11.9342V0L20.004 22.0657V13.4488H0L8.23165 22.0658L20.004 22.0657L20.0039 34Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id='clip0_3015_97'>
          <rect width='42' height='34' fill={fill} />
        </clipPath>
      </defs>
    </svg>
  );
};
