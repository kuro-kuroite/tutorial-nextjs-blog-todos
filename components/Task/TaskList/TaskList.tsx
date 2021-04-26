import Link from 'next/link';
import React, { FC } from 'react';

import { Props as TaskItemProps, TaskItem } from '../TaskItem/TaskItem';

export const PureTaskList: FC<PureProps> = ({ tasks }) => (
  <>
    <ul className="m-10 space-y-1 list-none">
      {tasks &&
        tasks.map(({ id, title }) => <TaskItem key={id} {...{ id, title }} />)}
    </ul>
    <Link href="/main/">
      <a className="flex w-max items-center cursor-pointer mt-12 text-blue-500 border-solid border-0 border-b border-blue-500">
        <svg
          className="w-6 h-6 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
            fillRule="evenodd"
          ></path>
        </svg>
        <span>Back to main</span>
      </a>
    </Link>
  </>
);

export const TaskList: FC<Props> = ({ tasks }) => {
  return <PureTaskList {...{ tasks }} />;
};

export type PureProps = Props;

export type Props = {
  tasks: TaskItemProps[];
};
