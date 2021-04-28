import { GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState, VFC } from 'react';

import { Layout } from '../components/Layout/Layout';
import { Props as TaskProps, Task } from '../components/Task/Task';
import { db } from '../lib/firebase/firebase-client';
import { fetchAllTasksData } from '../lib/tasks';

const PureTaskPage: VFC<PureProps> = ({ tasks }) => (
  <Layout title="Task">{tasks && <Task {...{ tasks }} />}</Layout>
);

const TaskPage: NextPage<Props> = ({ tasks: initialTasks }) => {
  // TODO(tasks): loading, failure
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const unSub = db
      .collection('tasks')
      .orderBy('id', 'desc')
      .onSnapshot((snapshot) => {
        setTasks(
          snapshot.docs.map((doc) => ({
            id: doc.data().id as number,
            title: doc.data().title as string,
          }))
        );
      });

    return () => unSub();
  }, []);

  return <PureTaskPage {...{ tasks }} />;
};

export default TaskPage;

export type PureProps = Props;

export type Props = StaticProps;

export type StaticProps = TaskProps;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  // TODO: validate data using error
  const { data } = await fetchAllTasksData();
  const tasks = data.tasks;

  return {
    props: { tasks },
    revalidate: 3,
  };
};
