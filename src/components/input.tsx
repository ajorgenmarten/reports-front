type CustomProps = {
    label?: string
    /**
     * @type {string} Estilos que se le pasan al elemento label que engloba todo el componente
     */
    classcomponent?: string
    /**
     * @type {string} Nombre de icono de bootstrap sin el prefijo "bi-" ej: "person"
     */
    icon?: string
    /**
     * @type {string} Mensaje de error personalizado
     */
    error?: string | boolean
}

type InputProps = CustomProps & React.InputHTMLAttributes<HTMLInputElement>

type TextAreaProps = CustomProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>

type SelectProps = {
    placeholder?: string
    items: any[]
    itemParser?: (items: any) => { key: string, value: string }
} & CustomProps & React.SelectHTMLAttributes<HTMLSelectElement>

export const Input = ({ classcomponent, label, error, icon, className, ...restProps }: InputProps) => {
    return <label className={`form-control w-full ${classcomponent??''}`}>
        {label && <div className="label">
            <span className="label-text">{label}</span>
        </div>}
        <Join>
            {icon && <span className="flex items-center justify-center px-3 join-item bg-base-200">
                <i className={`bi bi-${icon} text-xl`}></i>
            </span>}
            <input {...restProps} className={`input join-item w-full ${className??''}`} />
        </Join>
        {error && <div className="label p-0 pl-1 pt-1">
            <span className="label-text-alt text-red-400 truncate"> <i className="bi bi-info-circle"></i> {error}</span>
        </div>}
    </label>
}

export const TextArea = ({ label, error, className, classcomponent, ...restProps }: TextAreaProps) => {
    return <label className={`form-control ${classcomponent??''}`}>
        {label && <div className="label">
            <span className="label-text">{label}</span>
        </div>}
        <textarea {...restProps} className={`textarea textarea-bordered h-full ${className??''}`}></textarea>
        {error && <div className="label p-0 pl-1 pt-1">
            <span className="label-text-alt text-red-400 truncate"> <i className="bi bi-info-circle"></i> {error}</span>
        </div>}
    </label>
}

export const Select = ({ label, itemParser, items, placeholder, icon, className, classcomponent, error, ...restProps }: SelectProps) => {

    return <label className={`form-control w-full ${classcomponent??''}`}>
        {label && <div className="label">
            <span className="label-text">{label}</span>
        </div>}
        <Join>
            {icon && <span className="flex items-center justify-center px-3 join-item bg-base-200">
                <i className={`bi bi-${icon} text-xl`}></i>
            </span>}
            <select className={`select join-item w-full ${className??''}`} {...restProps} >
                <option disabled value=''>{placeholder}</option>
                {
                    items.map( item => {
                        const {key, value} = itemParser ? itemParser(item) : { key: item.toString(), value: item.toString() }
                        return <option key={key} value={key}>{value}</option>
                    } )
                }
            </select>
        </Join>
        {error && <div className="label p-0 pl-1 pt-1">
            <span className="label-text-alt text-red-400 truncate"> <i className="bi bi-info-circle"></i> {error}</span>
        </div>}
    </label>
}

const Join = ({ children }: { children: React.ReactNode }) => {
    return <div className="join input-bordered border-[1px]">
        {children}
    </div>
}