export const capitalize = (sentence) => {
    if (!sentence) return "";
    return sentence 
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};