import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Solo recibe y retorna los datos (sin BD ni proxy). Visible en Wireshark si viaja por HTTP.
    return NextResponse.json({ mensaje: "Datos recibidos", data: body }, { status: 200 });
  } catch (error) {
    console.error("Error al procesar la solicitud: ", error);
    return NextResponse.json({ mensaje: "Error al procesar la solicitud" }, { status: 500 });
  }
}
