// Root
const usersRoot = 'users';
const todosRoot = 'todos';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  user: {
    root: usersRoot,
    delete: `/${usersRoot}/:id`,
  },
  todo: {
    root: todosRoot,
    changeStatus: `/${todosRoot}/:id/change-status`,
    updateTitle: `/${todosRoot}/:id/update-title`,
    updateDescription: `/${todosRoot}/:id/update-description`,
  },
};
