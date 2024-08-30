'use client';

import { FC } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { SwitchProps, useSwitch } from '@nextui-org/switch';
import { useTheme } from 'next-themes';
import { useIsSSR } from '@react-aria/ssr';
import clsx from 'clsx';

import { Tooltip } from '@nextui-org/react';
import { HiMoon, HiSun } from 'react-icons/hi';

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps['classNames'];
  placement?: 'left' | 'right' | 'top' | 'bottom';
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
  placement = 'left',
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === 'light',
    'aria-label': `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`,
    onChange,
  });

  return (
    <Tooltip
      content={`Switch to ${theme === 'light' ? 'dark' : 'light'}`}
      placement={placement}
      showArrow
      closeDelay={100}
    >
      <Component
        {...getBaseProps({
          className: clsx(
            'px-px transition-opacity hover:opacity-80 cursor-pointer',
            className,
            classNames?.base
          ),
        })}
      >
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: clsx(
              [
                'w-auto h-auto',
                'bg-transparent',
                'rounded-lg',
                'flex items-center justify-center',
                'group-data-[selected=true]:bg-transparent',
                '!text-default-500',
                'pt-px',
                'px-0',
                'mx-0',
              ],
              classNames?.wrapper
            ),
          })}
        >
          {!isSelected || isSSR ? <HiSun size={22} /> : <HiMoon size={22} />}
        </div>
      </Component>
    </Tooltip>
  );
};
