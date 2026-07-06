const Input = ({
    label,
    type = "text",
    placeholder = "",
    name,
    value,
    onChange,
    id,
    ...props
}) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label 
                    htmlFor={id} 
                    className="text-[10px] font-bold uppercase tracking-wider text-text-main/50 select-none"
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl text-sm text-text-main placeholder:text-text-main/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 shadow-sm"
                {...props}
            />
        </div>
    );
};

export default Input;