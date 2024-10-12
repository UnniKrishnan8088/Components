import { Stack, Typography } from "@mui/material";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {};

export default function Home({}: Props) {
  const textRef = React.useRef(null);
  const boxRef = React.useRef(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      opacity: 0, // Start with opacity 0 (invisible)
      y: 50, // Start 50px below its original position
      duration: 1.2, // Animation duration
      ease: "power2.out", // Easing function for smooth effect
    });
    gsap.from(boxRef.current, {
      delay: 1,
      opacity: 0, // Start with opacity 0 (invisible)
      y: 50, // Start 50px below its original position
      duration: 1.2, // Animation duration
      ease: "power2.out", // Easing function for smooth effect
    });
  }, []);
  return (
    <Stack
      sx={{
        width: "100%",
        background: "#00FF9C",
        height: "95dvh",
        borderRadius: "1rem",
        padding: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack>
        <Typography
          ref={textRef} // Attach ref to the Typography
          variant="h3"
          fontWeight={"bold"}
        >
          Hi, My name is Unni Krishnan{" "}
        </Typography>
      </Stack>

      <Stack
        ref={boxRef}
        width={"400px"}
        bgcolor={"white"}
        height={"100%"}
        borderRadius={"10px"}
      ></Stack>
    </Stack>
  );
}
