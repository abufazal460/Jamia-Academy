export default function Layout({
  children,
  as: Element = "main",
  className = "",
  id = "main-content",
  ...props
}) {
  return (
    <Element
      id={id}
      tabIndex="-1"
      className={className}
      {...props}
    >
      {children}
    </Element>
  );
}