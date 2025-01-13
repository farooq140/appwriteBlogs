

function Button({
     children,
     bgColor="bg-blue-600",
     className="",
      textColor="text-white",    
     type='button',
     ...props
}) {
  return (
    <button className={`px-4 py-2  rounded-lg ${bgColor} ${className} ${textColor}`}{...props}>
     {children}
    </button>
  )
}

export default Button