import {
    decode,
} from "html-entities";

export function stripHtml(
    html: string
): string {
    return decode(
        html
            .replace(/<[^>]*>/g, "")
            .replace(/\s+/g, " ")
            .trim()
    );
}