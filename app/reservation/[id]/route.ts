import { prisma } from "@/services/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const { id } = params;
  const notes = body.notes as string;
  const people = body.people as string[];

  try {
    const reservation = await prisma.reservation.update({
      where: { id: Number(id) },
      data: {
        notes,
        people: {
          set: people.map((id) => ({ id: Number(id) })),
        },
      },
    });

    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.reservation.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
