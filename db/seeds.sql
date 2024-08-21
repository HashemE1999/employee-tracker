INSERT INTO department (name) VALUES ('Sales'), ('Engineering');

INSERT INTO role (title, salary, department_id) VALUES ('Manager', 80000, 1), ('Engineer', 60000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);