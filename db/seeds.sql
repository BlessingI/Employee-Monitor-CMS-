INSERT INTO department (name)
VALUES
  ('Accounting'),
  ('Payroll'),
  ('Fishery'),
  ('IT'),
  ('Software');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Engineer', 100.0, 1),
  ('Senior Engineer', 13.4, 2),
  ('CFO', 10.0, 3),
  ('Supervisor', 13.0, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, 2),
  ('Jack', 'London', 1, null),
  ('Robert', 'Bruce', 1, 2),
  ('Peter', 'Greenaway', 2, 2),
  ('Derek', 'Jarman', 4, null);