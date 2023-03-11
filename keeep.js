import {
  stick,
  unstick,
  isSticky,
  inYViewport,
  isOverOffset,
  inXViewport,
  activeIfOtherInYViewport,
  activeIfOtherInXViewport,
} from "./my-stickjs";

describe("isOverOffset", () => {
  it("should return false if anchor is defined and scrollTop is less than or equal to anchor", () => {
    // Arrange
    const el = { getBoundingClientRect: () => {} };
    const anchor = 100;
    const options = { direction: "top", offset: 10 };
    const documentElement = { scrollTop: 50 };
    document.documentElement = documentElement;

    // Act
    const result = isOverOffset(el, anchor, options);

    // Assert
    expect(result).toBeFalsy();
  });

  it("should return true if rect.top is less than or equal to options.offset when direction is top", () => {
    // Arrange
    const el = { getBoundingClientRect: () => ({ top: 5 }) };
    const options = { direction: "top", offset: 10 };

    // Act
    const result = isOverOffset(el, null, options);

    // Assert
    expect(result).toBeTruthy();
  });

  it("should return true if rect.left is less than or equal to options.offset when direction is left", () => {
    // Arrange
    const el = { getBoundingClientRect: () => ({ left: 5 }) };
    const options = { direction: "left", offset: 10 };

    // Act
    const result = isOverOffset(el, null, options);

    // Assert
    expect(result).toBeTruthy();
  });

  it("should return true if rect.right is less than or equal to options.offset when direction is right", () => {
    // Arrange
    const el = { getBoundingClientRect: () => ({ right: 5 }) };
    const options = { direction: "right", offset: 10 };

    // Act
    const result = isOverOffset(el, null, options);

    // Assert
    expect(result).toBeTruthy();
  });

  it("should return true if rect.bottom is less than or equal to options.offset when direction is bottom", () => {
    // Arrange
    const el = { getBoundingClientRect: () => ({ bottom: 5 }) };
    const options = { direction: "bottom", offset: 10 };

    // Act
    const result = isOverOffset(el, null, options);

    // Assert
    expect(result).toBeTruthy();
  });
});

describe("inYViewport", () => {
  it("should return true if the element is in the viewport", () => {
    // Arrange
    const element = { getBoundingClientRect: () => ({ top: 0, bottom: 10 }) };

    // Act
    const result = inYViewport(element);

    // Assert
    expect(result).toBeTruthy();
  });

  it("should return false if the element is not in the viewport", () => {
    // Arrange
    const element = {
      getBoundingClientRect: () => ({ top: -20, bottom: -10 }),
    };

    // Act
    const result = inYViewport(element);

    // Assert
    expect(result).toBeFalsy();
  });
});
