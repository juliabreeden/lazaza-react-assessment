import styled from "@emotion/styled";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const StyledButton = styled.button(({ theme }) => ({
  backgroundColor: theme.primaryLight,
  borderRadius: theme.borderRadius_2,
  color: theme.textInverted,
  padding: `${theme.space_md} ${theme.space_lg}`,
  fontSize: theme.h4_fontSize,
  boxShadow: "none",
  border: "none",
  cursor: "pointer",
  marginBottom: "2px",
  //hover effects
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.primary,
  },
}));

export default function Button(props: Props) {
  return (
    <StyledButton disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
}
