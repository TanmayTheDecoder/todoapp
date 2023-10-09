// *====================================JAVASCRIPT STYLING HANDLERS===============================

export const handleOnFocus = (e) => {
  e.target.style.background = "var(--white)";
  e.target.style.transition = ".3s linear";
  e.target.style.color = "var(--deep-blue)";
};

export const handleOnBlur = (e) => {
  e.target.style.background = "transparent";
  e.target.style.transition = ".3s linear";
  e.target.style.color = "var(--white)";
};

export const handleMouseEnter = (e) => {
  e.target.style.cursor = "pointer";
};
