import { Box, Grid, Stack } from "@mui/material";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from "./Home";
import About from "./About";

type Props = {};

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedPage({}: Props) {
  const sqrRef = useRef<any>();

  const cardRef = useRef<any>();

  const gridRef = useRef(null); // Reference to the grid container
  const itemRefs = useRef([]); // Store references to all grid items

  // Function to store grid items in the refs array
  const addToRefs = (el: any) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  useGSAP(() => {
    gsap.to(sqrRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0",
      ease: "power2.out",
      scrollTrigger: {
        trigger: sqrRef.current,
        start: "top 100%",
        end: "top 40%",
        scrub: 0.5,
      },
    });

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 1.5,
        duration: 1.5,
        scale: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 100%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      itemRefs.current,
      { opacity: 0, y: 50, scale: 0.9 }, // Initial state
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2, // Time gap between each item animation
        scrollTrigger: {
          trigger: gridRef.current, // Grid container triggers the animation
          start: "top 80%", // Animation starts when grid enters the viewport
          end: "bottom 100%", // Ends when grid leaves the viewport
          scrub: 1, // Smoothly sync animation with scroll
        },
      }
    );

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <Stack p={2} justifyContent={"center"} alignItems={"center"} gap={2}>
      <Home />
      <About />
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Stack
          className="sqr_div"
          component={"div"}
          ref={sqrRef}
          sx={{
            width: "300px",
            height: "200px",
            background: "#D4ADFC",
            borderRadius: "10px",
          }}
        ></Stack>
      </Stack>

      <Stack
        borderRadius={"10px"}
        bgcolor={"#FF204E"}
        width={"100%"}
        height={"100vh"}
        p={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          ref={cardRef}
          className="card_one"
          width={"300px"}
          height={"300px"}
          bgcolor={"#45FFCA"}
          borderRadius={"10px"}
        ></Stack>
      </Stack>

      <Grid
        ref={gridRef}
        container
        spacing={2}
        sx={{
          // Push grid down to ensure scrolling space
          padding: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <Grid
            key={i}
            item
            xs={12}
            sm={6}
            md={3} // Each item takes 1/4th of the row in desktop view (4 columns)
            ref={addToRefs}
          >
            <Box
              sx={{
                height: "150px",
                backgroundColor: ["#ff4d4d", "#4d94ff", "#4dff88", "#ffd84d"][
                  i % 4
                ],
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Item {i + 1}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
