export const TodoListSchema = {
    name: 'TodoList', 
    properties: {
      id: 'int',
      userId: 'int', 
      title: 'string',
    },
    primaryKey: 'id',
  };