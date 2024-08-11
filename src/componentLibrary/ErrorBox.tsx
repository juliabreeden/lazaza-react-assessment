import styled from "@emotion/styled";
import Box, { Props as BoxProps } from "./Box";

const _ErrorBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "40%",
  height: "auto",
  margin: "0 auto",
  marginTop: "10%",
  color: theme.textInverted,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.borderRadius_3,
  backgroundColor: theme.errorLight,
  padding: theme.space_md,
  boxShadow: `${theme.shadowDark}, ${theme.shadowLight}`,
  textAlign: "center",
}));

type Props<T> = BoxProps<T>;

export default function ErrorBox<T>(props: Props<T>): JSX.Element {
  return <_ErrorBox {...props} />;
}
