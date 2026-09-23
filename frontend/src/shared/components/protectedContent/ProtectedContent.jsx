import React, { memo, useCallback } from "react";

const BLOCKED_SHORTCUTS = new Set(["c", "x", "a", "u", "s", "p"]);

const ProtectedContent = memo(function ProtectedContent({
  children,
  className = "",
}) {
  const preventAction = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleKeyDown = useCallback((event) => {
    const key = event.key.toLowerCase();

    if (
      (event.ctrlKey || event.metaKey) &&
      BLOCKED_SHORTCUTS.has(key)
    ) {
      event.preventDefault();
    }
  }, []);

  return (
    <div
      className={`select-none ${className}`.trim()}
      onCopy={preventAction}
      onCut={preventAction}
      onContextMenu={preventAction}
      onDragStart={preventAction}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {children}
    </div>
  );
});

export default ProtectedContent;