import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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
    const newCourse = await prisma.course.create({
        data: {
            className,
            description,
            subject,
            creditHours: Number(creditHours),
            instructorId: Number(instructorId),
        },
    })

    return NextResponse.json(newCourse, { status: 201 })
}

//route for get
export async function GET() {
    try {
        const courses = await prisma.course.findMany({
            include: {
                instructor: true,
            },
        })
        return NextResponse.json(courses)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
    }
}

