import type {
  Task,
  TaskById,
  TaskError,
  TaskIds,
  TaskList,
  TaskParams,
} from '../types/task';
import { db } from './firebase/firebase-client';

export const fetchAllTasksData = async (): Promise<{
  data: TaskList;
  error?: TaskError;
  loading: boolean;
}> => {
  // FYI: https://stackoverflow.com/a/66064876
  const querySnapshot = await db
    .collection('tasks')
    .orderBy('id', 'desc')
    .get();
  const tasks: TaskList['tasks'] = querySnapshot.docs.map((doc) => ({
    id: doc.data().id as number,
    title: doc.data().title as string,
  }));
  const data: TaskList = { tasks };

  return { data, error: undefined, loading: false };
};

export const fetchAllTaskIds = async (): Promise<{
  data: TaskIds;
  error?: TaskError;
  loading: boolean;
}> => {
  // FYI: https://stackoverflow.com/a/66064876
  const querySnapshot = await db
    .collection('tasks')
    .orderBy('id', 'desc')
    .get();
  const tasks: TaskIds['tasks'] = querySnapshot.docs.map((doc) => ({
    id: doc.data().id as number,
  }));
  const data: TaskIds = { tasks };

  return { data, error: undefined, loading: false };
};

export const fetchTaskData = async (
  id: TaskParams['id']
): Promise<{
  data: TaskById;
  error?: TaskError;
  loading: boolean;
}> => {
  // FYI: https://stackoverflow.com/a/66064876
  const querySnapshot = await db
    .collection('tasks')
    .where('id', '==', parseInt(id))
    .limit(1)
    .get();
  const task: TaskById['task'] = querySnapshot.docs.map((doc) => ({
    id: doc.data().id as number,
    title: doc.data().title as string,
  }))[0];
  const data: TaskById = { task };

  return { data, error: undefined, loading: false };
};

export const createTask = async (title: string): Promise<void> => {
  const querySnapshot = await db
    .collection('tasks')
    .orderBy('id', 'desc')
    .get();
  const newId: Task['id'] = querySnapshot.docs.map((doc) => {
    return (doc.data().id as number) + 1;
  })[0];

  if (newId === undefined) {
    console.log(`title: ${title} 新規作成できませんでした`);

    return;
  }

  // console.log(`id: ${newId} title: ${title} 新規作成`);

  await db.collection('tasks').add({ id: newId, title });
};

export const updateTask = async (title: string, id: number): Promise<void> => {
  const querySnapshot = await db
    .collection('tasks')
    .where('id', '==', id)
    .limit(1)
    .get();
  const docId: string = querySnapshot.docs.map((doc) => {
    return doc.id;
  })[0];

  console.log(`docId: ${docId} title: ${title} 上書き`);
  await db.collection('tasks').doc(docId).update({ title });
};

export const deleteTask = async (id: number): Promise<void> => {
  const querySnapshot = await db
    .collection('tasks')
    .where('id', '==', id)
    .limit(1)
    .get();
  const docId: string = querySnapshot.docs.map((doc) => {
    return doc.id;
  })[0];

  console.log(`docId: ${docId} 削除`);
  await db.collection('tasks').doc(docId).delete();
};
