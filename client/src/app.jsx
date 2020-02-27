import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [],
      adminMode: false,
      displayInfo: ""
    };
  }
  adminQuery() {
    axios
      .post("/admin", document.getElementById("tableNameInput").value.trim())
      .then(data => console.log(data.data));
  }
  createTable() {
    axios
      .post("/login/" + document.getElementById("tableNameInput").value.trim())
      .then(
        data =>
          this.setState({
            displayInfo:
              "create table success. please remember the name of the table"
          }),
        err => this.setState({ displayInfo: "create table failed" })
      );
  }
  getTable(e) {
    axios
      .get("/table/" + e.target.textContent)
      .then(data => console.log(data.data));
  }
  dropTable(e) {
    axios
      .post(
        "/admin",
        `DROP TABLE ${e.target.parentNode.childNodes[0].textContent};`
      )
      .then(data => console.log(data.data));
  }
  componentDidMount() {
    window.login = password => {
      axios
        .post("/admin/" + password)
        .then(data => this.setState({ adminMode: true }));
      console.clear();
    };
    const refresh = () => {
      axios
        .get("/admin")
        .then(data =>
          this.setState({ tables: data.data.map(obj => Object.values(obj)[0]) })
        );
    };
    refresh();
    setInterval(refresh, 5000);
  }
  render() {
    return (
      <div id="content">
        <form onSubmit={e => e.preventDefault()}>
          Create a table for yourself:
          <br />
          <br />
          <input id="tableNameInput" name="name" />
          <br />
          <button onClick={this.createTable.bind(this)}>CREATE TABLE</button>
          {this.state.adminMode ? (
            <button onClick={this.adminQuery}>Admin Query</button>
          ) : null}
        </form>
        <div id="infoDisplay">{this.state.displayInfo}</div>
        <br />
        *table schema:
        <br />
        CREATE TABLE table_name(
        <br />
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        <br />
        prop1 TEXT,
        <br />
        prop2 INTEGER,
        <br />
        prop3 FLOAT,
        <br />
        prop4 TEXT);
        <br />
        <br />
        User Guide:
        <br />
        To use this database, send post requests to
        <br />
        http://yoursql.herokuapp.com/query/[tablename]
        <br />
        and attach query string as request body
        <br />
        {this.state.adminMode ? (
          <div id="tables">
            tables:
            <br />
            <br />
            {this.state.tables.map((tableName, i) => (
              <div>
                <button onClick={this.getTable}>{tableName}</button>
                <button onClick={this.dropTable}>drop</button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
