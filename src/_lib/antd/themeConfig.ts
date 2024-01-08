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
            borderRadius: 50,
            borderRadiusLG: 50,
            borderRadiusSM: 50,
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
    },
};

export default theme;
