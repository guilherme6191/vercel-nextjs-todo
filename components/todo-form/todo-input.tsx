'use client';

import { useContext } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { TodoFormContext } from './root';
import { Button } from '../ui/button';

export function TodoInput() {
  const { pending } = useFormStatus();
  const context = useContext(TodoFormContext);
  return (
    <>
      <Label htmlFor="add-todo" className="w-fit self-center text-xl my-2">
        Add todo
      </Label>
      <div className="flex items-center border-b py-2">
        <Input
          id="add-todo"
          name="message"
          type="text"
          placeholder="What needs to be done?"
          autoComplete="off"
          disabled={pending}
          required
        />
      </div>
      {context.error && (
        <>
          <small className="text-red-400 my-2">
            Server returned: <span className="font-mono">{context.error || 'Something went wrong!'}</span>
          </small>
          <Button type="submit">Try again?</Button>
        </>
      )}
    </>
  );
}
