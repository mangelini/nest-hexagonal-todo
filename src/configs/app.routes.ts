// Root
const usersRoot = 'users';
const todosRoot = 'todos';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  user: {
    root: usersRoot,
    register: `/${usersRoot}/register`,
    login: `/${usersRoot}/login`,
    delete: `/${usersRoot}/:id`,
  },
  todo: {
    root: todosRoot,
    delete: `/${todosRoot}/:id`,
    findByUser: `/${todosRoot}/find-by-user/`,
    findByStatus: `/${todosRoot}/find-by-status/`,
  },
};
