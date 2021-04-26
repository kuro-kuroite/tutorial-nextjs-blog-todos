import { GetStaticProps, NextPage } from 'next';
import React, { VFC } from 'react';

import { Layout } from '../components/Layout/Layout';
import { Props as TaskProps, Task } from '../components/Task/Task';
import { fetchAllTasksData } from '../lib/tasks';

const PureTaskPage: VFC<PureProps> = ({ tasks }) => (
  <Layout title="Task">{tasks && <Task {...{ tasks }} />}</Layout>
);

const TaskPage: NextPage<Props> = ({ tasks }) => {
  // TODO(tasks): loading, failure

  return <PureTaskPage {...{ tasks }} />;
};

export default TaskPage;

export type PureProps = Props;

export type Props = StaticProps;

export type StaticProps = TaskProps;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  // TODO: validate data using error
  const { data } = await fetchAllTasksData();
  const tasks = data.posts;

  return {
    props: { tasks },
  };
};
