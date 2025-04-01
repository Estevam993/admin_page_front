'use client'
import { Stack as MuiStack } from "@mui/material";

export default function Content({ children, ...props }) {
  return (
    <MuiStack
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      sx={{
        height: "calc(100vh - 64px)",
      }}
      {...props}
    >
      {children}
    </MuiStack>
  );
}
