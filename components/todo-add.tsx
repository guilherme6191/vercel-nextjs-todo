'use client';

import { experimental_useOptimistic as useOptimistic, useCallback, useRef, useState, ReactEventHandler } from 'react';
import { SuccessToast } from './success-toast';
import { Button } from './ui/button';
import { addTodoAction } from '@/app/actions';
import { TodoButton } from './todo-button';
import { TodoFormField } from './todo-form-field';

export function TodoAdd({ userEmail }: { userEmail: string }) {
  const [error, setError] = useState('');

  const formRef = useRef<HTMLFormElement>(null);
  const [optIsSuccess, setOptIsSuccess] = useOptimistic(false, (_, newState: boolean) => newState);

  const onFormAction = async (ev: FormData) => {
    const res = await addTodoAction(ev, userEmail);
    if (res.error) {
      setError(res.error);
    }
    return res;
  };

  const handleOnSubmit = () => {
    setError('');
  };

  return (
    <>
      <div className="flex justify-center">
        <form
          className="w-full flex justify-center flex-col"
          ref={formRef}
          id="add-todo-form"
          name="add-todo-form"
          onSubmit={handleOnSubmit}
          action={async (form) => {
            const { error } = await onFormAction(form);
            if (!error) {
              formRef.current?.reset();
              setOptIsSuccess(true);
            }
          }}
        >
          <TodoFormField />
          <TodoButton />

          {error && (
            <>
              <small className="text-red-400 my-2">
                Server returned: <span className="font-mono">{error || 'Something went wrong!'}</span>
              </small>
              <Button type="submit">Try again?</Button>
            </>
          )}
        </form>
      </div>

      {optIsSuccess && <SuccessToast />}
    </>
  );
}
