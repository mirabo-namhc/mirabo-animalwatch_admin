import type { ThemeConfig } from 'antd';

const color = {
  primary: '#0e91ef',
  subPrimary: '#e57c00',
  gray: '#252525',
  gray20: '#eeeeee',
  blue: '#bcd7ff',
  black: '#000000',
  error: '#d82700',
  wrong: '#ff5b37',
  white: '#ffffff',
};

const theme: ThemeConfig = {
  token: {
    fontFamily: 'var(--font-biz)',
    fontSize: 16,
    colorPrimary: color.primary,
    colorPrimaryText: color.black,
  },
  components: {
    Button: {
      fontWeight: 700,
      paddingInline: 16,
      controlHeightSM: 32,
      controlHeight: 48,
      controlHeightLG: 56,
      borderRadius: 8,
      borderRadiusLG: 8,
      borderRadiusSM: 8,
    },
    Menu: {
      itemHeight: 48,
      itemMarginInline: 12,
      itemMarginBlock: 8,
      itemPaddingInline: 12,
      itemHoverColor: color.gray,
      itemSelectedColor: color.primary,
    },
    Table: {
      colorFillAlter: color.gray20,
      colorFillContent: color.gray20,
      colorFillSecondary: color.gray20,
      headerBorderRadius: 0,
    },
    Input: {
      activeBorderColor: color.blue,
      colorBorder: color.gray20,
      colorText: color.gray,
      colorTextDisabled: color.gray20,
      paddingInline: 12,
      paddingInlineSM: 12,
      lineHeight: 1.5,
      controlHeight: 40,
      controlHeightSM: 40,
      fontSize: 14,
      fontSizeIcon: 14,
      lineWidth: 2,
      borderRadius: 6,
      borderRadiusSM: 6,
    },
    Select: {
      colorBorder: color.gray20,
      borderRadius: 6,
      borderRadiusSM: 6,
      controlHeight: 40,
      controlHeightSM: 40,
      colorTextPlaceholder: color.gray20,
      fontWeightStrong: 700,
      optionSelectedFontWeight: 700,
      fontSize: 14,
      fontSizeIcon: 14,
      lineWidth: 2,
      lineHeight: 1.5,
      colorBgContainerDisabled: color.gray20,
      colorTextDisabled: color.black,
      optionSelectedBg: color.white,
      optionSelectedColor: color.primary,
    },
    Form: {
      labelColor: color.gray,
      labelFontSize: 12,
      verticalLabelPadding: '0 0 4px',
      labelHeight: 48,
      itemMarginBottom: 0,
    },
    DatePicker: {
      colorBorder: color.gray20,
      colorText: color.gray,
      lineHeight: 1.5,
      lineWidth: 2,
      controlHeight: 40,
      controlHeightSM: 40,
      fontSize: 14,
      fontSizeIcon: 14,
      borderRadius: 6,
      borderRadiusSM: 6,
    },
  },
};

export default theme;
