function isOverOffset(el, anchor = null, options) {
  var rect = el.getBoundingClientRect();
  if (anchor && document.documentElement.scrollTop <= anchor) return false;
  switch (options.direction) {
    case "top":
      if (rect.top <= options.offset) return true;
    case "left":
      if (rect.left <= options.offset) return true;
    case "right":
      if (rect.right <= options.offset) return true;
    case "bottom":
      if (rect.bottom <= options.offset) return true;
  }
}

export function stick(el, options) {
  if (options.keepWidth) el.style.width = el.clientWidth + "px";
  if (options.keepHeight) el.style.height = el.clientHeight + "px";
  el.classList.add("is-sticky");
}

export function unstick(el) {
  if (options.keepWidth) element.style.width = null;
  if (options.keepHeight) element.style.height = null;
  el.classList.remove("is-sticky");
}

export function isSticky(
  el,
  options = {
    direction: "top",
    offset: 0,
    viewport: 0,
    keepWidth: true,
    keepHeight: true,
  }
) {
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
    unstick(element);
  }
  document.addEventListener("scroll", (event) => {
    if (isOverOffset(element, anchor, options)) {
      if (!anchor) anchor = document.documentElement.scrollTop;
      stick(element, options);
    } else {
      anchor = null;
      unstick(element);
    }
  });
}

export function inYViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom >= 0;
}

export function inXViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.right <= 0 && rect.left >= 0;
}

export function activeIfOtherInYViewport(target, other) {
  document.addEventListener("scroll", (event) => {
    if (!target) return;
    if (inYViewport(other)) target.classList.add("active");
    else target.classList.remove("active");
  });
}

export function activeIfOtherInXViewport(target, other) {
  document.addEventListener("scroll", (event) => {
    if (!target) return;
    if (inXViewport(other)) target.classList.add("active");
    else target.classList.remove("active");
  });
}
