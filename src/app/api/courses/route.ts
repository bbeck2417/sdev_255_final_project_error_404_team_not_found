import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

//route for post
export async function POST(req: Request) {
    const body = await req.json()

    const { className, description, subject, creditHours } = body

    //check that each field has a value
    if (!className || !description || !subject || !creditHours) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        )
    }

    //still need authorization/login in so this is temp placeholder
    const instructorId = 1

    //create new entry for course
    const { data, error } = await supabase
        .from("Course")
        .insert([
            {
                className,
                description,
                subject,
                creditHours: Number(creditHours),
                instructorId: Number(instructorId)
            },
        ])
        .select()

    if (error) {
        console.error("Insert failed:", error.message)
        return new Response(
            JSON.stringify({ error: error.message }), { status: 500 }
        )
    }

    return new Response(JSON.stringify(data[0]), { status: 201 })
}

//route for get
export async function GET() {

    const { data, error } = await supabase.from("Course").select("*")

    if (error) {
        console.error("Supabase connection failed:", error.message)
        return new Response(JSON.stringify({ connected: false, error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify(data))

}

