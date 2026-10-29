import Landing from "components/php2shell/Landing";
import en from "content/php2shell/en";
import { PAGE_PATH } from "content/php2shell/shared";

export default function Php2Shell() {
  return <Landing t={en} path={PAGE_PATH} />;
}

Php2Shell.theme = "light";
Php2Shell.getLayout = (page) => page;
