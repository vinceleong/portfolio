function IconButton(props) {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
}

export default IconButton;
