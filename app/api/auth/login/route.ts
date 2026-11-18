import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { correo, contrasena } = await request.json();
    if (!correo || !contrasena) {
      return NextResponse.json(
        { mensaje: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const selectQuery =
      "SELECT id_usuario, correo, contrasena FROM usuarios WHERE correo = ?";
    const response: any = await query(selectQuery, [correo]);

    if (response.length === 0) {
      return NextResponse.json(
        { mensaje: "Correo o contraseña incorrectos." },
        { status: 400 }
      );
    }

    const usuario = response[0];

    // Solo retorna los datos del usuario (sin contraseña)
    const { contrasena, ...usuarioSinContrasena } = usuario;

    return NextResponse.json(
      { mensaje: "Bienvenido", usuario: usuarioSinContrasena },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al iniciar sesión: ", error);
    return NextResponse.json(
      { mensaje: "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}
