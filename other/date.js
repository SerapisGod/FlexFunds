export function getFormattedDate(dateInput) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (date instanceof Date && !isNaN(date)) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else {
    console.error("Invalid date:", dateInput);
    return "Invalid date";
  }
}
