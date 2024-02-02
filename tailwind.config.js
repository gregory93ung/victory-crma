/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    colors: {
      base: {
        white: { 0: '#ffffff' },
        black: { 100: '#000000' },
        transparent: 'transparent',
        current: 'currentColor',
      },

      green: {
        40: { value: '#42be65' },
        50: { value: '#24a148' },
        80: { value: '#044317' },
      },
      yellow: { 30: { value: '#f1c21b' } },
      blue: { 50: { value: '#4589ff' }, 70: { value: '#0043ce' } },

      red: {
        40: { value: '#ff8389', hover: '#ff6168' },
        50: { value: '#fa4d56', hover: '#ee0713' },
        60: { value: '#da1e28', hover: '#b81922' },
        70: { value: '#a2191f', hover: '#c21e25' },
        80: { value: '#750e13', hover: '#921118' },
      },

      gray: {
        10: { value: '#f4f4f4', hover: '#e8e8e8' },
        20: { value: '#e0e0e0', hover: '#d1d1d1' },
        30: { value: '#c6c6c6', hover: '#b5b5b5' },
        40: { value: '#a8a8a8', hover: '#999999' },
        50: { value: '#8d8d8d', hover: '#7a7a7a' },
        60: { value: '#6f6f6f', hover: '#5e5e5e' },
        70: { value: '#525252', hover: '#636363' },
        80: { value: '#393939', hover: '#474747' },
        90: { value: '#262626', hover: '#333333' },
        100: { value: '#161616', hover: '#292929' },
      },

      background: {
        DEFAULT: 'var(--background)',
        hover: 'var(--background-hover)',
        active: 'var(--background-active)',
        selected: {
          DEFAULT: 'var(--background-selected)',
          hover: 'var(--background-selected-hover)',
        },
        inverse: {
          DEFAULT: 'var(--background-inverse)',
          hover: 'var(--background-inverse-hover)',
        },
      },

      layer: {
        '01': 'var(--layer-01)',
        '02': 'var(--layer-02)',
        '03': 'var(--layer-03)',
        hover: {
          '01': 'var(--layer-hover-01)',
          '02': 'var(--layer-hover-02)',
          '03': 'var(--layer-hover-03)',
        },
        active: {
          '01': 'var(--layer-active-01)',
          '02': 'var(--layer-active-02)',
          '03': 'var(--layer-active-03)',
        },
        selected: {
          '01': 'var(--layer-selected-01)',
          '02': 'var(--layer-selected-02)',
          '03': 'var(--layer-selected-03)',
          hover: {
            '01': 'var(--layer-selected-hover-01)',
            '02': 'var(--layer-selected-hover-02)',
            '03': 'var(--layer-selected-hover-03)',
          },
          inverse: 'var(--layer-selected-inverse)',
          disabled: 'var(--layer-selected-disabled)',
        },
        accent: {
          '01': 'var(--layer-accent-01)',
          '02': 'var(--layer-accent-02)',
          '03': 'var(--layer-accent-03)',
          hover: {
            '01': 'var(--layer-accent-hover-01)',
            '02': 'var(--layer-accent-hover-02)',
            '03': 'var(--layer-accent-hover-03)',
          },
          active: {
            '01': 'var(--layer-accent-active-01)',
            '02': 'var(--layer-accent-active-02)',
            '03': 'var(--layer-accent-active-03)',
          },
        },
      },

      field: {
        '01': 'var(--field-01)',
        '02': 'var(--field-02)',
        '03': 'var(--field-03)',
        hover: {
          '01': 'var(--field-hover-01)',
          '02': 'var(--field-hover-02)',
          '03': 'var(--field-hover-03)',
        },
      },

      border: {
        subtitle: {
          '00': 'var(--border-subtle-00)',
          '01': 'var(--border-subtle-01)',
          '02': 'var(--border-subtle-02)',
          '03': 'var(--border-subtle-03)',
          selected: {
            '01': 'var(--border-subtle-selected-01)',
            '02': 'var(--border-subtle-selected-02)',
            '03': 'var(--border-subtle-selected-03)',
          },
        },
        strong: {
          '01': 'var(--border-strong-01)',
          '02': 'var(--border-strong-02)',
          '03': 'var(--border-strong-03))',
        },
        title: {
          '01': 'var(--border-title-01)',
          '02': 'var(--border-title-02)',
          '03': 'var(--border-title-03)',
        },
        inverse: 'var(--border-inverse)',
        disabled: 'var(--border-disabled)',
      },

      text: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        placeholder: 'var(--text-placeholder)',
        'on-color': {
          DEFAULT: 'var(--text-on-color)',
          disabled: 'var(--text-on-color-disabled)',
        },
        helper: 'var(--text-helper)',
        error: 'var(--text-error)',
        inverse: 'var(--text-inverse)',
        disabled: 'var(--text-disabled)',
      },

      icon: {
        primary: 'var(--icon-primary)',
        secondary: 'var(--icon-secondary)',
        'on-color': {
          DEFAULT: 'var(--icon-on-color)',
          disabled: 'var(--icon-on-color-disabled)',
        },
        inverse: 'var(--icon-inverse)',
        disabled: 'var(--icon-disabled)',
      },

      button: {
        secondary: {
          DEFAULT: 'var(--button-secondary)',
          hover: 'var(--button-secondary-hover)',
          active: 'var(--button-secondary-active)',
        },
        danger: {
          secondary: 'var(--button-danger-secondary)',
          hover: 'var(--button-danger-hover)',
          active: 'var(--button-danger-active)',
        },
        separator: 'var(--button-separator)',
        disabled: 'var(--button-disabled)',
      },

      support: {
        error: 'var(--support-error)',
        warning: 'var(--support-warning)',
        error: { inverse: 'var(--support-error-inverse)' },
        success: {
          DEFAULT: 'var(--support-success)',
          inverse: 'var(--support-success-inverse)',
        },
        warning: { inverse: 'var(--support-warning-inverse)' },
        info: {
          DEFAULT: 'var(--support-info)',
          inverse: 'var(--support-info-inverse)',
        },
      },

      miscellaneous: {
        overlay: 'var(--overlay)',
        skeleton: {
          element: 'var(--skeleton-element)',
          background: 'var(--skeleton-background)',
        },
      },
    },
    plugins: [require('tailwindcss-animate')],
  },
};
