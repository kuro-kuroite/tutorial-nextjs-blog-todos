import type {
  TaskById,
  TaskError,
  TaskIds,
  TaskList,
  TaskParams,
} from '../types/task';

export const fetchAllTasksData = async (): Promise<{
  data: TaskList;
  error?: TaskError;
  loading: boolean;
}> => {
  const { data } = await new Promise<{ data: TaskList }>((resolve) => {
    resolve({
      data: {
        tasks: [
          {
            id: 1,
            title: 'task A',
          },
          {
            id: 2,
            title: 'task B',
          },
        ],
      },
    });
  });

  return { data, error: undefined, loading: false };
};

export const fetchAllTaskIds = async (): Promise<{
  data: TaskIds;
  error?: TaskError;
  loading: boolean;
}> => {
  const { data } = await new Promise<{ data: TaskIds }>((resolve) => {
    resolve({
      data: {
        tasks: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
      },
    });
  });

  return { data, error: undefined, loading: false };
};

export const fetchTaskData = async (
  id: TaskParams['id']
): Promise<{
  data: TaskById;
  error?: TaskError;
  loading: boolean;
}> => {
  const tasks = [
    {
      id: 1,
      title: 'task A',
    },
    {
      id: 2,
      title: 'task B',
    },
  ];
  const { data } = await new Promise<{ data: TaskById }>((resolve) => {
    resolve({
      data: {
        task: tasks.find((task) => task.id === parseInt(id)) ?? tasks[0],
      },
    });
  });

  return { data, error: undefined, loading: false };
};
