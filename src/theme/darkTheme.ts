import { palette } from "./palette";

export const sizes = {
  borderRadius_1: "0.25rem",
  borderRadius_2: "0.5rem",
  borderRadius_3: "0.75rem",
  borderRadius_4: "1rem",
  fontSize_ui: "0.9rem",
  lineHeight_ui: 1.5,
  lineHeight: 1.25,
  size_jumbo: "4rem",
  size_large: "3rem",
  size_medium: "2.5rem",
  size_small: "2rem",
  size_tiny: "1.5rem",
  space_huge: "4rem",
  space_lg: "1.75rem",
  space_md: "1rem",
  space_sm: "0.75rem",
  space_xl: "2rem",
  space_xs: "0.5rem",
  space_xxs: "0.25rem",
  zIndex_100: 100,
  zIndex_1600: 1600,
  zIndex_200: 200,
  zIndex_400: 400,
  zIndex_800: 800,
};

export const fontStyles = {
  fontFamily: "Helvetica",
  fontSize_base: "16px",
  fontSize_small: "0.7rem",
  fontSize_ui: "0.875rem",
  fontSize_xs: "0.55rem",
  fontWeight_bold: 700,
  fontWeight_regular: 400,
  fontWeight_semiBold: 600,
  fontWeight_thin: 100,
  h1_fontSize: "2.125rem",
  h1_fontWeight: 700,
  h2_fontSize: "2rem",
  h2_fontWeight: 600,
  h3_fontSize: "1.5rem",
  h3_fontWeight: 600,
  h4_fontSize: "1.25rem",
  h4_fontWeight: 600,
  h5_fontSize: "0.875rem",
  h5_fontWeight: 400,
  h6_fontSize: "0.75rem",
  h6_fontWeight: 400,
};

const colors = {
  // backgroundColor: palette.grey[80],
  backgroundColor: palette.purple[40],
  diabledBackgroundColor: palette.grey[20],
  // cardBackground: palette.yellow[40],
  cardBackground: "#ffe2e6",
  error: palette.red[40],
  errorLight: palette.red[20],
  navBackground: palette.grey[60],
  linkColor: palette.purple[60],
  linkColorHover: palette.purple[40],
  primary: palette.purple[80],
  primaryLight: palette.purple[40],
  secondary: palette.green[60],
  secondaryLight: palette.green[40],
  //making shadows a bit lighter and softer
  shadowDark: "6px 6px 18px #2e2f33",
  shadowLight: "-6px -6px 18px #64676b",
  textColor: palette.grey[80],
  textInverted: palette.white,
  warn: palette.red[60],
  warnLight: palette.red[40],
};

export const darkTheme = {
  ...sizes,
  ...fontStyles,
  ...colors,
};

export type Theme = typeof darkTheme;
