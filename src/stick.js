export function isOverOffset(el, anchor = null, options) {
  var rect = el.getBoundingClientRect();
  switch (options.direction) {
    case "top":
      if (anchor && document.documentElement.scrollTop <= anchor) return false;
      return rect.top <= options.offset;
    case "left":
      if (anchor && document.documentElement.scrollLeft <= anchor) return false;
      return rect.left <= options.offset;
    case "right":
      if (anchor && document.documentElement.scrollLeft <= anchor) return false;
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      return rect.right - vw + options.offset <= 0;
    case "bottom":
      if (anchor && document.documentElement.scrollTop <= anchor) return false;
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      return rect.bottom - vh + options.offset <= 0;
    default:
      return false;
  }
}

export function stick(el, options) {
  if (options.keepWidth) el.style.width = el.clientWidth + "px";
  if (options.keepHeight) el.style.height = el.clientHeight + "px";
  el.classList.add("is-sticky");
}

export function unstick(el, options) {
  if (options.keepWidth) el.style.width = null;
  if (options.keepHeight) el.style.height = null;
  el.classList.remove("is-sticky");
}

export function isSticky(el, options = {}) {
  const defaultOptions = {
    direction: "top",
    offset: 0,
    viewport: 0,
    keepWidth: true,
    keepHeight: true,
  };

  options = Object.assign({}, defaultOptions, options);

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  if (vw < options.viewport) return;

  let element = el;
  let anchor = null;

  if (typeof el === "string") element = document.getElementById(el);
  if (!element) {
    console.warn("not an valid element or id");
    return;
  }

  element.style.setProperty(
    "--offset" + options.direction.toUpperCase(),
    options.offset + "px"
  );

  if (isOverOffset(element, anchor, options)) {
    anchor = setAnchor(anchor, options.direction);
    stick(element, options);
  } else {
    anchor = null;
    unstick(element, options);
  }

  function handleScroll() {
    if (isOverOffset(element, anchor, options)) {
      anchor = setAnchor(anchor, options.direction);
      stick(element, options);
    } else {
      anchor = null;
      unstick(element, options);
    }
  }

  document.addEventListener("scroll", handleScroll);

  handleScroll();
}

function setAnchor(anchor, direction) {
  if (anchor) return anchor;
  switch (direction) {
    case "top":
      return document.documentElement.scrollTop;
    case "left":
      return document.documentElement.scrollLeft;
    case "right":
      return document.documentElement.scrollLeft;
    case "bottom":
      return document.documentElement.scrollTop;
    default:
      return anchor;
  }
}

export function inYViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom >= 0;
}

export function inXViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.right <= 0 && rect.left >= 0;
}

export function activeIfOtherInViewport(target, other, isXAxis = false, activeClass = "active") {
  function handleScroll() {
    if (!target) return;

    if (isXAxis ? inXViewport(other) : inYViewport(other))
      target.classList.add(activeClass);
    else target.classList.remove(activeClass);
  }

  document.addEventListener("scroll", handleScroll);

  handleScroll();
}

export function activeIfInViewport(target, isXAxis = false, activeClass = "active") {
  function handleScroll() {
    if (!target) return;

    if (isXAxis ? inXViewport(target) : inYViewport(target))
      target.classList.add(activeClass);
    else target.classList.remove(activeClass);
  }

  document.addEventListener("scroll", handleScroll);

  handleScroll();
}
