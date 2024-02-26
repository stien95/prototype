interface Props {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
  title?: string;
}

export default function OperationButton({onClick, children, title, disabled}: Props ) {
  return (
    <button
    type="button"
    className="bg-black/5 hover:bg-black/10 w-6 h-6 disabled:pointer-events-none disabled:opacity-50"
    onClick={() => onClick()}
    title={title}
    disabled={disabled}>
      {children}
    </button>
  )
}
