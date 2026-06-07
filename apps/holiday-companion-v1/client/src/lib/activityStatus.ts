export type ActivityStatus =
  | "planned"
  | "done"
  | "skipped"
  | "moved"
  | "replaced"
  | "free_time";

export function getActivityStatusFromTitle(title: string): ActivityStatus {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.startsWith("done:")) {
    return "done";
  }

  if (normalizedTitle.startsWith("skipped:")) {
    return "skipped";
  }

  if (normalizedTitle.startsWith("moved:")) {
    return "moved";
  }

  if (normalizedTitle.startsWith("replaced:")) {
    return "replaced";
  }

  if (
    normalizedTitle.includes("free and easy") ||
    normalizedTitle.includes("free time") ||
    normalizedTitle.includes("relax")
  ) {
    return "free_time";
  }

  return "planned";
}

export function getActivityStatusLabel(status: ActivityStatus) {
  switch (status) {
    case "done":
      return "Done";
    case "skipped":
      return "Skipped";
    case "moved":
      return "Moved";
    case "replaced":
      return "Replaced";
    case "free_time":
      return "Free time";
    default:
      return "Planned";
  }
}

export function getActivityStatusTone(status: ActivityStatus) {
  switch (status) {
    case "done":
      return "green";
    case "skipped":
      return "red";
    case "moved":
      return "violet";
    case "replaced":
      return "blue";
    case "free_time":
      return "orange";
    default:
      return "zinc";
  }
}
