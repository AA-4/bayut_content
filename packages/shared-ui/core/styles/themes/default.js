const colors = {
    primary: '#28AF6B',
    secondary: '#006169',
    anchorColor: '#0592E9',
    black: '#222222',
    pureBlack: '#000000',
    body: '#FAFAFA',
    white: '#FFFFFF',
    gray: '#7C7C7C',
    codGray: '#171717',
    whiteSmoke: '#F5F5F5',
    mySin: '#FFB61B',
    mineShaft: '#3B3B3B',
    subLocHeadingColor: '#525252',
    teal: 'rgba(0,97,105, 0.05)',
};

const theme = {
    direction: 'ltr',
    shape: {
        borderRadius: 6,
    },
    palette: {
        primary: {
            main: colors.primary,
        },
        secondary: {
            main: colors.secondary,
        },
        text: {
            primary: colors.black,
            secondary: colors.white,
            tertiary: colors.gray,
            anchor: colors.anchorColor,
        },
        category: {
            pulse: colors.mySin,
        },
        warning: {
            main: colors.orange,
        },
        error: {
            main: colors.red,
        },
        white: {
            100: `#ffffff`,
            90: `rgba(255,255,255, 0.95)`,
            60: `rgba(255,255,255, 0.6)`,
            4: `rgba(255,255,255, 0.04)`,
            95: `#f1f1f1`,
        },
    },
    color: colors,
    typography: {
        fontFamily: "'Lato', 'Helvetica', 'Arial', sans-serif",
        defaultSize: '1.6rem',
        body1: {
            color: 'inherit',
            fontWeight: 'inherit',
        },
        greyed: {
            color: colors.gray,
        },
        fontWeightBold: 700,
    },
};

export default theme;
