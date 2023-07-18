import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/formulario")
public class Formulario extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Obtener los datos del formulario
        String nombre = request.getParameter("nombre");
        String apellido = request.getParameter("apellido");
        String mensaje = request.getParameter("mensaje");

        // Configuración de la conexión a la base de datos
        String url = "jdbc:mysql://localhost:3306/oradores";
        String usuario = "root";
        String contraseña = "";

        // Conexión a la base de datos
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306", "root", "")) {
            // Crear la sentencia SQL para insertar los datos en la tabla
            String sql = "INSERT INTO oradores (first_name, last_name, mensajes) VALUES (?, ?, ?)";

            // Crear el PreparedStatement y establecer los parámetros
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, nombre);
                pstmt.setString(2, apellido);
                pstmt.setString(3, mensaje);

                // Ejecutar la sentencia SQL
                int filasInsertadas = pstmt.executeUpdate();

                if (filasInsertadas > 0) {
                    response.getWriter().println("Los datos se han guardado correctamente en la base de datos.");
                } else {
                    response.getWriter().println("No se pudieron guardar los datos en la base de datos.");
                }
            }
        } catch (SQLException e) {
            response.getWriter().println("Error en la conexión o al guardar los datos: " + e.getMessage());
        }
    }
}
