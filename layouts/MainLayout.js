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
      transition={{
        duration: 0.1,
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
  ];

  const { pathname } = router;

  const header = (
    <header>
      <SEO />
      <div className="pt-8 flex justify-center ">
        {routes.map((route) => {
          const isActive = pathname === route.path;
          return (
            <AnimatedButton key={route.path} className="mr-8">
              <Link href={route.path}>
                <span className={isActive ? "font-bold" : "bold"}>
                  {route.label}
                </span>
              </Link>
            </AnimatedButton>
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
    <div className="flex h-screen flex-col justify-between">
      {header}
      <div className="h-full w-full mb-auto w-full flex justify-center items-center]">
        <div className="w-full xs:max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl py-24">
          {children}
        </div>
      </div>
      {/* <main
        className="flex flex-col"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main> */}
      {footer}
    </div>
  );
}

export default MainLayout;
