package Database;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Statement;

public class DatabaseConnection {
    private static final String jdbcUrl = "jdbc:mysql://localhost:3306/pontodigital";
    private static final String username = "root";
    private static final String password = "";

    private static Connection conn;

    public static Connection getConnection() {
        try {
            if (conn == null || conn.isClosed()) {
                conn = DriverManager.getConnection(jdbcUrl, username, password);
            }
            return conn;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }  
    }

    public static void testConnection() {
        Connection tesConn = getConnection();

        if (tesConn != null) {
            System.out.println("Conexão bem-sucedida!");
            try {
                tesConn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("Falha na conexão!");
        }
    }

    public static void pushInformations() {
        Connection connection = getConnection();
        if (connection != null) {
            try {
                Statement statement = connection.createStatement();
                String query = "SELECT * FROM dadosfuncionario";
                ResultSet resultSet = statement.executeQuery(query);

                while (resultSet.next()) {
                    Integer id = resultSet.getInt("id_funcionario");
                    String cpf = resultSet.getString("cpf");
                    String nome = resultSet.getString("nome");
                    Date dataNascimento = resultSet.getDate("dataNascimento");
                    String endereco = resultSet.getString("endereco");
                    String email = resultSet.getString("email");
                    Integer telefone = resultSet.getInt("telefone");
                    String profissao = resultSet.getString("profissao");

                    System.out.println("ID: " + id + ", CPF: " + cpf + ", Nome: " + nome + ", Data de Nascimento: " + dataNascimento
                    + ", Endereço: " + endereco + ", Email: " + email + ", Telefone: " + telefone + ", Profissão: " + profissao);

                }

                resultSet.close();
                statement.close();
            } catch(SQLException e) {
                e.printStackTrace();
            } finally {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        } else {
            System.out.println("Falha na conexão!");
        }
    }

}
