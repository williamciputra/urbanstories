import { ImageResponse } from "next/og";

export const size = {
    width: 1200,
    height: 600,
};

export const contentType = "image/png";

export default function TwitterImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    background: "#F7F4EE",
                    color: "#1F1F1F",
                    fontFamily: "Arial",
                }}
            >
                <div
                    style={{
                        fontSize: 34,
                        fontWeight: 600,
                        letterSpacing: 6,
                        textTransform: "uppercase",
                    }}
                >
                    Urbanstories
                </div>

                <div
                    style={{
                        marginTop: 28,
                        fontSize: 64,
                        fontWeight: 700,
                        lineHeight: 1.2,
                        maxWidth: 900,
                    }}
                >
                    Cerita yang Menginspirasi
                </div>

                <div
                    style={{
                        marginTop: 36,
                        fontSize: 26,
                        color: "#666666",
                    }}
                >
                    urbanstories.id
                </div>
            </div>
        ),
        size
    );
}