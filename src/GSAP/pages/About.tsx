import React from "react";
import { Stack, Typography } from "@mui/material";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {};

gsap.registerPlugin(ScrollTrigger);

export default function About({}: Props) {
  const textRef = React.useRef<any>();
  const paraRef = React.useRef<any>();

  const firstDivRef = React.useRef<any>();
  const secondDivRef = React.useRef<any>();
  const thirdDivRef = React.useRef<any>();

  useGSAP(() => {
    gsap.from(textRef.current, {
      opacity: 0, // Start with opacity 0 (invisible)
      y: 50, // Start 50px below its original position
      duration: 1.2, // Animation duration
      ease: "power2.out", // Easing function for smooth effect
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 60%",
        end: "top 40%",
        scrub: 0.5,
      },
    });
    gsap.from(paraRef.current, {
      opacity: 0, // Start with opacity 0 (invisible)
      y: 50, // Start 50px below its original position
      duration: 1.2, // Animation duration
      ease: "power2.out", // Easing function for smooth effect
      delay: 1,
      scrollTrigger: {
        trigger: paraRef.current,
        start: "top 60%",
        end: "top 40%",
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <Stack
      sx={{
        width: "100%",
        background: "#B6FFA1",
        height: "95dvh",
        borderRadius: "1rem",
        padding: 3,
        justifyContent: "space-between",
      }}
    >
      <Stack direction={"row"}>
        <Typography className="heading" variant="h2" ref={textRef}>
          Elevating oral health with personalised service
        </Typography>
        <Typography ref={paraRef}>
          Elevating oral health with personalised service, Elevating oral health
          with personalised service
        </Typography>
      </Stack>
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
        }}
      >
        <Stack
          ref={firstDivRef}
          sx={{
            background: "#222831",
            height: "300px",
            borderRadius: "10px",
          }}
        ></Stack>
        <Stack
          ref={secondDivRef}
          sx={{
            background: "#00ADB5",
            height: "300px",
            borderRadius: "10px",
          }}
        ></Stack>
        <Stack
          ref={thirdDivRef}
          sx={{
            background: "#EEEEEE",
            height: "300px",
            borderRadius: "10px",
          }}
        ></Stack>
      </Stack>
    </Stack>
  );
}
