"use client";
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Card as MuiCard,
  Typography,
} from "@mui/material";

export default function Card({ children, title, buttons, sx, ...props }) {
  return (
    <MuiCard  {...props}  sx={{...sx }}>
      {!!title && (
        <>
          <CardHeader title={title}/>
          <Divider />
        </>
      )}
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
}
