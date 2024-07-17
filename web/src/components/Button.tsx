interface ButtonProps {
  text: string;
  full?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ text, full, className, type = 'button' }: ButtonProps) => {
  const buttonStyle =
    'py-2 px-4 bg-purple-500 text-white rounded mt-1' +
    (full ? ' w-full' : '') +
    (className ? ' ' + className : '');

  return (
    <button className={buttonStyle} type={type}>
      {text}
    </button>
  );
};

export default Button;
