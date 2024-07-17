interface TextInputProps {
  label: string;
  defaultValue?: string;
  minLength?: number;
  required?: boolean;
}

const TextInput = ({
  label,
  defaultValue,
  minLength,
  required = true,
}: TextInputProps) => {
  return (
    <div className="flex flex-col">
      <label className="self-start text-[12px] capitalize" htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        name={label}
        type="text"
        minLength={minLength}
        required={required}
        placeholder={defaultValue}
        className="py-2 px-4 border border-gray-300 rounded mt-1"
      />
    </div>
  );
};

export default TextInput;
