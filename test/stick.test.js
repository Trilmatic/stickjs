import {
  isOverOffset,
  stick,
  unstick,
  isSticky,
  inYViewport,
  inXViewport,
  activeIfOtherInViewport,
} from "../src/stick.js";

describe("isOverOffset", () => {
  test("returns true when element is over the specified offset", () => {
    const el = document.createElement("div");
    el.style.margin = "50px auto";
    el.style.width = "100px";
    el.style.height = "100px";
    document.body.appendChild(el);

    el.getBoundingClientRect = jest.fn(() => ({
      x: 50,
      y: 0,
      width: 100,
      height: 100,
      top: 50,
      right: 900,
      bottom: 900,
      left: 0,
    }));

    const options = {
      direction: "top",
      offset: 10,
    };

    expect(isOverOffset(el, null, options)).toBe(false);

    document.body.removeChild(el);
  });

  test("returns false when element is not over the specified offset", () => {
    const el = document.createElement("div");
    el.style.margin = "50px auto";
    el.style.width = "100px";
    el.style.height = "100px";
    document.body.appendChild(el);

    el.getBoundingClientRect = jest.fn(() => ({
      x: 50,
      y: 0,
      width: 100,
      height: 100,
      top: 50,
      right: 900,
      bottom: 900,
      left: 0,
    }));

    const options = {
      direction: "top",
      offset: 60,
    };

    expect(isOverOffset(el, null, options)).toBe(true);

    document.body.removeChild(el);
  });

  test("returns false when anchor is defined and element is not scrolled past it", () => {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.top = "50px";
    el.style.left = "50px";
    el.style.width = "100px";
    el.style.height = "100px";
    document.body.appendChild(el);

    const anchor = 100;
    document.documentElement.scrollTop = 50;

    const options = {
      direction: "top",
      offset: 10,
    };

    expect(isOverOffset(el, anchor, options)).toBe(false);

    document.documentElement.scrollTop = 0;
    document.body.removeChild(el);
  });
});

describe("stick", () => {
  test("it adds the is-sticky class to the element", () => {
    const el = document.createElement("div");
    stick(el, {});
    expect(el.classList.contains("is-sticky")).toBe(true);
  });
});

describe("stick", () => {
  test('removes "is-sticky" class and resets width/height styles when options are provided', () => {
    // create a mock element with the "is-sticky" class and some custom styles
    const el = document.createElement("div");
    el.classList.add("is-sticky");
    el.style.width = "200px";
    el.style.height = "100px";

    // call the unstick function with some options
    unstick(el, { keepWidth: true, keepHeight: false });

    // check that the "is-sticky" class has been removed
    expect(el.classList.contains("is-sticky")).toBe(false);

    // check that the width style has been reset (because keepWidth was set to true)
    expect(el.style.width).toBe("");

    // check that the height style has not been reset (because keepHeight was set to false)
    expect(el.style.height).toBe("100px");
  });
});

describe("isSticky", () => {
  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div id="test-element" style="height: 1000px;"></div>
    `;
  });

  afterEach(() => {
    // Clean up DOM
    document.body.innerHTML = "";
  });

  it("should apply sticky styles when element is over the offset", () => {
    const el = document.getElementById("test-element");
    const options = {
      direction: "top",
      offset: 50,
      viewport: 0,
      keepWidth: true,
      keepHeight: true,
    };
    const stickSpy = jest.spyOn(el.classList, "add");

    // Simulate scroll over the offset
    document.documentElement.scrollTop = 100;

    el.getBoundingClientRect = jest.fn(() => ({
      x: 50,
      y: 0,
      width: 100,
      height: 100,
      top: 50,
      right: 900,
      bottom: 900,
      left: 0,
    }));

    isSticky(el, options);

    expect(stickSpy).toHaveBeenCalledWith("is-sticky");
    //expect(el.style.getPropertyValue("--offsetTOP")).toBe("50px");
  });

  it("should remove sticky styles when element is under the offset", () => {
    const el = document.getElementById("test-element");
    const options = {
      direction: "top",
      offset: 50,
      viewport: 0,
      keepWidth: true,
      keepHeight: true,
    };
    const unstickSpy = jest.spyOn(el.classList, "remove");

    // Simulate scroll under the offset
    document.documentElement.scrollTop = 0;

    el.getBoundingClientRect = jest.fn(() => ({
      x: 50,
      y: 0,
      width: 100,
      height: 100,
      top: 100,
      right: 900,
      bottom: 900,
      left: 0,
    }));

    isSticky(el, options);

    expect(unstickSpy).toHaveBeenCalledWith("is-sticky");
    //expect(el.style.getPropertyValue("--offsetTOP")).toBe("0px");
  });

  it("should not apply sticky styles when viewport width is below the threshold", () => {
    const el = document.getElementById("test-element");
    const options = {
      direction: "top",
      offset: 50,
      viewport: 1200,
      keepWidth: true,
      keepHeight: true,
    };
    const stickSpy = jest.spyOn(el.classList, "add");

    // Simulate small viewport width
    window.innerWidth = 1000;

    isSticky(el, options);

    expect(stickSpy).not.toHaveBeenCalled();
    //expect(el.style.getPropertyValue("--offsetTOP")).toBe("50px");
  });
});

describe("inYViewport", () => {
  it("should return true if element is in the vertical viewport", () => {
    // create a dummy element
    const el = document.createElement("div");
    el.style.height = "200px";
    el.style.width = "200px";
    el.getBoundingClientRect = jest.fn(() => ({
      x: 50,
      y: 0,
      width: 100,
      height: 100,
      top: 100,
      right: 900,
      bottom: -100,
      left: 0,
    }));

    // add the dummy element to the DOM
    document.body.appendChild(el);

    // assert that the element is in the vertical viewport
    expect(inYViewport(el)).toBe(false);
  });

  it("should return false if element is not in the vertical viewport", () => {
    // create a dummy element
    const el = document.createElement("div");
    el.style.height = "200px";
    el.style.width = "200px";
    el.getBoundingClientRect = jest.fn(() => ({
      x: 50,
      y: 0,
      width: 100,
      height: 100,
      top: -100,
      right: 900,
      bottom: 900,
      left: 0,
    }));

    // add the dummy element to the DOM
    document.body.appendChild(el);

    // assert that the element is not in the vertical viewport
    expect(inYViewport(el)).toBe(true);
  });
});

describe("inXViewport", () => {
  test("returns true if element is in viewport horizontally", () => {
    const el = document.createElement("div");
    el.style.width = "100px";
    el.style.height = "100px";
    el.getBoundingClientRect = jest.fn(() => ({
      x: 50,
      y: 0,
      width: 100,
      height: 100,
      top: 100,
      right: 0,
      bottom: 900,
      left: 200,
    }));
    document.body.appendChild(el);

    expect(inXViewport(el)).toBe(true);
  });

  test("returns false if element is not in viewport horizontally", () => {
    const el = document.createElement("div");
    el.style.width = "100px";
    el.style.height = "100px";
    el.getBoundingClientRect = jest.fn(() => ({
      x: 50,
      y: 0,
      width: 100,
      height: 100,
      top: 100,
      right: 0,
      bottom: 900,
      left: -200,
    }));
    document.body.appendChild(el);

    expect(inXViewport(el)).toBe(false);
  });
});

describe("activeIfOtherInViewport", () => {
  let targetEl;
  let otherEl;

  beforeEach(() => {
    // create the target and other elements
    targetEl = document.createElement("div");
    otherEl = document.createElement("div");

    // add classes and styles as necessary for your use case
    targetEl.classList.add("target");
    otherEl.classList.add("other");
    otherEl.style.height = "100vh";
    document.body.appendChild(targetEl);
    document.body.appendChild(otherEl);
  });

  afterEach(() => {
    // remove the target and other elements from the document
    targetEl.remove();
    otherEl.remove();
  });

  test('adds "active" class when other element is in viewport', () => {
    otherEl.getBoundingClientRect = jest.fn(() => ({
      x: 50,
      y: 0,
      width: 100,
      height: 100,
      top: -100,
      right: 0,
      bottom: 900,
      left: -200,
    }));

    // call the function
    activeIfOtherInViewport(targetEl, otherEl);

    // expect the target element to have the "active" class
    expect(targetEl.classList.contains("active")).toBe(true);
  });

  test('removes "active" class when other element is not in viewport', () => {
    otherEl.getBoundingClientRect = jest.fn(() => ({
      x: 50,
      y: 0,
      width: 100,
      height: 100,
      top: 100,
      right: 0,
      bottom: -200,
      left: -200,
    }));

    // add the "active" class to the target element
    targetEl.classList.add("active");

    // call the function
    activeIfOtherInViewport(targetEl, otherEl);

    // expect the target element to not have the "active" class
    expect(targetEl.classList.contains("active")).toBe(false);
  });
});
