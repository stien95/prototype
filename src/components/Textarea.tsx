import {forwardRef,  HTMLProps } from "react";
import clsx from "clsx";
interface Props extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
  errors?: string;
}
const Textarea = forwardRef<HTMLTextAreaElement, Props>(({label, errors, ...props}, ref) => {
  return (
    <label
      htmlFor={props.id}
      className="flex flex-col"
    >
      {label && <span className="text-gray-700">{label}</span>}
      <textarea
        {...props}
        ref={ref}
        className={clsx(`w-96 max-w-[90vw] ring-1 ring-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-sky-300`, props.className && props.className)}
      />
      {errors && <p className="bg-rose-500 text-white my-2 p-2 rounded-lg">{errors}</p>}
    </label>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;