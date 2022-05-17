INSERT INTO department (name)
VALUES
  ('Accounting'),
  ('Payroll'),
  ('Fishery'),
  ('IT'),
  ('Software');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Manager', 100.0, 1),
  ('Engineer', 13.4, 2),
  ('Intern', 10.0, 3),
  ('Engineer', 13.0, 1),
  ('Intern', 12.0, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, 1),
  ('Jack', 'London', 2, 2),
  ('Robert', 'Bruce', 3, 1),
  ('Peter', 'Greenaway', 4, 2),
  ('Derek', 'Jarman', 5, 1);