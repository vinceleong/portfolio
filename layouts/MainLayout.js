import Icon from "components/Icon";
import ThemeSwitch from "components/ThemeSwitch";
import { motion } from "framer-motion";

function AnimatedButton({ children, ...rest }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.2,
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
  const routes = [
    {
      label: "Welcome",
      path: "/",
    },
    {
      label: "About Me",
      path: "/aboutme",
    },
  ];

  const header = (
    <header>
      <div className="pt-8 flex justify-center ">
        {routes.map((route) => (
          <AnimatedButton key={route.path} className="mr-8">
            {route.label}
          </AnimatedButton>
        ))}
        <AnimatedButton>
          <ThemeSwitch />
        </AnimatedButton>
      </div>
    </header>
  );

  const footer = (
    <footer>
      <div className="pb-8 flex justify-center">
        <Icon className="text-[#0e76a8] mr-5">linkedin</Icon>
        <Icon className="text-[white]">github</Icon>
      </div>
    </footer>
  );

  return (
    <div className="flex h-screen flex-col justify-between">
      {header}
      <div className="h-full w-full mb-auto w-full flex justify-center items-center]">
        <div className="w-full xs:max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
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
