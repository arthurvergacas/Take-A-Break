import { ReactNode, useEffect, useRef, useState } from "react";

import styles from "../styles/components/Menu.module.css";

import Link from "next/link";

interface MenuProps {
  children: ReactNode;
}

export function Menu(props: MenuProps) {
  const [location, setLocation] = useState("");

  const [windowWidth, setWindowWidth] = useState(null);

  const [scrollPos, setScrollPos] = useState(null);

  const homeDiv = useRef(null);
  const aboutDiv = useRef(null);

  const navbarDiv = useRef(null);

  const transitionTime = 225;

  function onLocationChange() {
    // HARDCODED The '-5' is there to make the transition smoother and so the moment when the
    //           definitive div appears the transition div is no longer visible

    // Also worth noting that getBoundingClientRect().x is used, even though I'm moving the div in the Y-axis direction 🤷‍♂️

    // going from home to about
    if (window.location.pathname === "/about" && location == "/") {
      if (windowWidth <= 860) {
        homeDiv.current.style.transform = `translateX(${
          aboutDiv.current.getBoundingClientRect().y + 30
        }px)`;
      } else {
        homeDiv.current.style.transform = `translateY(${
          aboutDiv.current.getBoundingClientRect().x - 5
        }px)`;
      }

      setTimeout(() => {
        setLocation(window.location.pathname);
        homeDiv.current.style.transform = "";
      }, transitionTime);
    }
    // going from about to home
    else if (window.location.pathname === "/" && location == "/about") {
      if (windowWidth <= 860) {
        aboutDiv.current.style.transform = `translateX(-${
          homeDiv.current.getBoundingClientRect().y + 30
        }px)`;
      } else {
        aboutDiv.current.style.transform = `translateY(-${
          homeDiv.current.getBoundingClientRect().x - 5
        }px)`;
      }

      setTimeout(() => {
        setLocation(window.location.pathname);
        aboutDiv.current.style.transform = "";
      }, transitionTime);
    }
    // going out of the links in the navbar
    else {
      setLocation(window.location.pathname);
    }
  }

  useEffect(() => {
    setLocation(window.location.pathname);
    setWindowWidth(window.innerWidth);

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    let previousScrollPos = window.pageYOffset;
    function handleScroll() {
      console.log("im scrolling", window.pageYOffset, previousScrollPos);
      let currentScrollPos = window.pageYOffset;
      if (previousScrollPos > currentScrollPos || currentScrollPos <= 40) {
        navbarDiv.current.style.top = "0";
      } else {
        navbarDiv.current.style.top = "-4rem";
      }
      previousScrollPos = currentScrollPos;
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (typeof window !== "undefined") {
    useEffect(() => {
      onLocationChange();
    }, [window.location.pathname]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <div className={styles.menuBox} ref={navbarDiv}>
          <Link href="/">
            <img src="img/chronometer.png" alt="Take A Break" />
          </Link>

          <div className={styles.links}>
            <Link href="/">
              <a>
                <img src="icons/home.svg" alt="Home" />
                <div
                  className={`${location == "/" ? styles.activeLink : ""}`}
                  style={{
                    transition: `transform ${transitionTime}ms ease-in-out`,
                  }}
                  ref={homeDiv}
                ></div>
              </a>
            </Link>

            <Link href="/about">
              <a>
                <img src="icons/info.svg" alt="Sobre" />
                <div
                  className={`${location == "/about" ? styles.activeLink : ""}`}
                  style={{
                    transition: `transform ${transitionTime}ms ease-in-out`,
                  }}
                  ref={aboutDiv}
                ></div>
              </a>
            </Link>
          </div>
        </div>
      </div>

      {props.children}
    </div>
  );
}
