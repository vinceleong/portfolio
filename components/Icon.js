import * as FI from "react-icons/fi";
import { capitalize } from "utils/stringUtils";

function Icon(props) {
  const { children, ...rest } = props;
  const iconName = children.startsWith("Fi")
    ? children
    : `Fi${capitalize(children)}`;

  let CustomIcon = FI[iconName];

  if (typeof CustomIcon !== "function") CustomIcon = FI.FiOctagon;

  return (
    <CustomIcon
      style={{
        width: "25px",
        height: "25px",
      }}
      {...rest}
    />
  );
}

export default Icon;
