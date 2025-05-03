export default function formatFollowers(number: number) {
  if (number >= 1_000_000_000) {
    return (
      (number / 1_000_000_000).toFixed(number % 1_000_000_000 === 0 ? 0 : 1) +
      "B"
    );
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(number % 1_000_000 === 0 ? 0 : 1) + "M";
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(number % 1_000 === 0 ? 0 : 1) + "K";
  } else {
    return number.toString();
  }
}
