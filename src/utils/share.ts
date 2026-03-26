import { Share } from "react-native";

export async function shareReply(text, mode) {
  try {
    await Share.share({
      message: mode === "roast"
        ? text + "\n\n🔥 Roasted by Ghost Writer"
        : text + "\n\n👻 Written by Ghost Writer",
    });
  } catch (error) {
    console.error("Share error:", error);
  }
}
