import Icon from "components/Icon";
import ThemeSwitch from "components/ThemeSwitch";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import SEO from "components/SEO";

function AnimatedButton({ children, ...rest }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        fontWeight: "bold",
      }}
      whileTap={{
        scale: 1,
      }}
      transition={{
        duration: 0.9,
      }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

function MainLayout({ children }) {
  const router = useRouter();
  const routes = [
    {
      label: "Vince",
      path: "/",
    },
    {
      label: "My Works",
      path: "/myworks",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  const { pathname } = router;

  const header = (
    <header>
      <SEO />
      <div className="pt-8 flex justify-center ">
        {routes.map((route) => {
          const isActive = pathname === route.path;
          return (
            <Link key={route.path} href={route.path}>
              <AnimatedButton className="mr-8">
                <span className={isActive ? "font-bold" : "bold"}>
                  {route.label}
                </span>
              </AnimatedButton>
            </Link>
          );
        })}
        <AnimatedButton>
          <ThemeSwitch />
        </AnimatedButton>
      </div>
    </header>
  );

  const footer = (
    <footer>
      <div className="pb-8 flex justify-center items-center">
        <AnimatedButton>
          <Icon
            className="cursor-pointer text-[#0e76a8] mr-5"
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/chun-yong-leong-0665a7199",
                "_blank"
              );
            }}
          >
            linkedin
          </Icon>
        </AnimatedButton>
        <AnimatedButton>
          <Icon
            className="cursor-pointer text-[black] dark:text-[white]"
            onClick={() => {
              window.open("https://github.com/vinceleong", "_blank");
            }}
          >
            github
          </Icon>
        </AnimatedButton>
      </div>
    </footer>
  );

  return (
    <div
    // style={{
    //   height: "100%",
    //   width: "100%",
    //   backgroundImage: "url('/images/me.png')",
    //   backgroundPosition: "center",
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover",
    // }}
    >
      <div
        className="flex h-screen flex-col justify-between"
        style={{
          zIndex: 2,
        }}
      >
        {header}
        <div className="h-full w-full mb-auto w-full flex justify-center items-center]">
          <div className="w-full xs:max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-5 md:px-0 py-24">
            {children}
          </div>
        </div>
        {footer}
      </div>
    </div>
  );
}

export default MainLayout;
