const Label = ({ name, label, isRequired = true }) => (
  <label
    htmlFor={name}
    className={"block text-sm font-medium leading-5 text-gray-600 " + (isRequired ? 'required-field' : '')}
  >
    {label}
  </label>
)

const Input = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
  isValid = true,
  autoFocus,
  isRequired = true
}) => {
  return (
    <div className="w-full">
      <Label name={name} label={label} isRequired={isRequired}/>
      {type === "textarea" ? (
        <textarea
          className={`mt-1 block w-full h-32 px-3 py-1 text-sm rounded-md shadow-inner border focus:outline-none focus:shadow-outline-blue focus:border-blue-300 ${
            !isValid ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
          <input
            id={name}
            name={name}
            type={type}
            className={`${
              isValid ? "border-gray-300" : "border-red-300 bg-red-50"
              } mt-1 shadow-inner appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-250 ease-in-out sm:text-sm sm:leading-5`}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocus}
          />
        )}
    </div>
  )
}

const FormError = ({ touched, error }) => {
  if (!touched) return null
  return <p className="mt-1 text-xs text-red-500">{error}</p>
}

export { Input, Label, FormError }
