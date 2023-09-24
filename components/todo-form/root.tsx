'use client';

import { experimental_useOptimistic as useOptimistic, useCallback, useRef, useState, ReactEventHandler } from 'react';
import { SuccessToast } from '../success-toast';

import { createContext } from 'react';

import { Todos } from '@/lib/xata.codegen.server';

type TOptimisticAction = {
  type: 'toggle' | 'delete' | 'add';
  item: Todos;
};

export type TTodoFormContext = {
  optSetList: (action: TOptimisticAction) => void;
  todoList: Todos[];
  isSuccess: boolean;
  setOptIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  error?: string;
};

export const TodoFormContext = createContext({} as any);

export function TodoFormRoot({ onAddTodo, userEmail, children, todoList }: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [optIsSuccess, setOptIsSuccess] = useOptimistic(false, (_, newState: boolean) => newState);
  const [optError, setOptError] = useOptimistic('', (_, newState: string) => newState);
  const [optList, optSetList] = useOptimistic(todoList, (state: Todos[], { type, item }: TOptimisticAction) => {
    if (type === 'toggle') {
      return state.map((todo) => {
        if (todo.id === item.id) {
          return {
            ...todo,
            is_done: Boolean(item.is_done),
          };
        }
        return todo;
      });
    }
    if (type === 'delete') {
      return state.filter((todo) => todo.id !== item.id);
    }
    return state;
  });

  return (
    <>
      <TodoFormContext.Provider
        value={{ optSetList, todoList: optList, isSuccess: optIsSuccess, setOptIsSuccess, error: optError }}
      >
        <div className="flex justify-center">
          <form
            className="w-full flex justify-center flex-col"
            ref={formRef}
            id="add-todo-form"
            name="add-todo-form"
            action={async (form) => {
              const { error } = await onAddTodo(form, userEmail);
              if (!error) {
                formRef.current?.reset();
                setOptIsSuccess(true);
              } else {
                setOptError(error);
              }
            }}
          >
            {...children}
          </form>
        </div>

        {optIsSuccess && <SuccessToast />}
      </TodoFormContext.Provider>
    </>
  );
}
