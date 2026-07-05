import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(
    request: Request,
    { params }: Props
) {
    try {
        const { id } = await params;

        const supabase = await createClient();

        const { data, error } = await supabase
            .from("media")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Media not found",
            },
            {
                status: 404,
            }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: Props
) {
    try {
        const { id } = await params;

        const { title, caption } =
            await request.json();

        const supabase = await createClient();

        const { data, error } = await supabase
            .from("media")
            .update({
                caption,
            })
            .eq("id", id)
            .select();

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            throw new Error("Media not found");
        }

        const updatedMedia = data[0];

        if (error) {
            throw error;
        }

        return NextResponse.json(updatedMedia);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to update media",
            },
            {
                status: 500,
            }
        );
    }
}