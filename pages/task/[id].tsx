import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { VFC } from 'react';

import { Layout } from '../../components/Layout/Layout';
import {
  Props as TaskDetailProps,
  TaskDetail,
} from '../../components/TaskDetail/TaskDetail';
import { fetchAllTaskIds, fetchTaskData } from '../../lib/tasks';
import { TaskParams } from '../../types/task';

const PureTaskDetailPage: VFC<PureProps> = ({ task: { id, title } }) => (
  <Layout title="Task">
    <TaskDetail {...{ id, title }} />
  </Layout>
);

const TaskDetailPage: NextPage<Props> = ({ task }) => {
  // TODO(tasks): loading, failure
  if (!task) {
    return <div>loading...</div>;
  }

  return <PureTaskDetailPage {...{ task }} />;
};

export default TaskDetailPage;

export type StaticProps = {
  task: TaskDetailProps;
};

export type PureProps = Props;

export type Props = StaticProps;

export const getStaticPaths: GetStaticPaths<TaskParams> = async () => {
  const { data } = await fetchAllTaskIds();
  const paths = data.tasks.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps<StaticProps, TaskParams> = async ({
  params: { id } = { id: '' },
}) => {
  // TODO: validate id, data using error
  const { data } = await fetchTaskData(id);
  const task = data.task;

  return {
    props: { task },
  };
};
