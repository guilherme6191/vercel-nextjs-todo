import { Input } from './ui/input';
import { Label } from './ui/label';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export function TodoFormField() {
  const { pending } = useFormStatus();
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
        />
      </div>
    </>
  );
}
