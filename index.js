function isOverOffset(el, anchor = null, options) {
  var rect = el.getBoundingClientRect();
  if (anchor && document.documentElement.scrollTop <= anchor) return false;
  switch (options.direction) {
    case "top":
      return rect.top <= options.offset;
    case "left":
      return rect.left <= options.offset;
    case "right":
      return rect.right <= options.offset;
    case "bottom":
      return rect.bottom <= options.offset;
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
  if (options.keepWidth) element.style.width = null;
  if (options.keepHeight) element.style.height = null;
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
    if (!anchor) anchor = document.documentElement.scrollTop;
    stick(element, options);
  } else {
    anchor = null;
    unstick(element, options);
  }

  function handleScroll() {
    if (isOverOffset(element, anchor, options)) {
      if (!anchor) anchor = document.documentElement.scrollTop;
      stick(element, options);
    } else {
      anchor = null;
      unstick(element);
    }
  }

  document.addEventListener("scroll", handleScroll);

  handleScroll();
}

export function inYViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom >= 0;
}

export function inXViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.right <= 0 && rect.left >= 0;
}

export function activeIfOtherInViewport(target, other, isXAxis = false) {
  function handleScroll() {
    if (!target) return;

    if (isXAxis ? inXViewport(other) : inYViewport(other))
      target.classList.add("active");
    else target.classList.remove("active");
  }

  document.addEventListener("scroll", handleScroll);

  handleScroll();
}
