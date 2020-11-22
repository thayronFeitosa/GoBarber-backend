
<h1>GoBarber-backend</h1>
<p>Projeto GoBarber e um projeto que tem como objetivo fazer o controle de atendimentos de uma barbearia, trazendo para o barbeiro o controle total de seus horarios de atendimentos que os clientes iram maracando de acordo com os horarios disponiveis</p>
<p>O projeto será construido com as pricipais ferramentas diponiveis no  mecado como: <strong> Docker, Docker composer, express, typescript, JWT node. ORM... </strong>  e muito mais  </p>

<p>
    <h3>Configurações Docker</h3>
        baixando o container do postgres.

    ```
     sudo docker run --name gostack_postgress -e POSTGRES_PASSWORD=root123 -p 5432:5432 -d postgres
    ```
</p>

<p>
    <h3>Configurações ORM</h3>
        As configurações basicar deveram ser passadas no arquivo armconfig.json na raiz do projeto. A estrutura deverá ser feita como o exemplo a baixo.

    ```json
        {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "root123",
        "database": "gostack_gobarber"
        }
    ```
</p>