 
type InputProps = {
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
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = (props: InputProps) => {
    return <label className={`form-control w-full ${props.classcomponent}`}>
        <div className="label">
            {props.label ? <span className="label-text">{props.label}</span> : null}
        </div>
        { props.icon ? <JoinBox {...props} /> : <input {...props} className={`input input-bordered w-full ${props.className}`} /> }
        { props.error && <div className="label p-0 pl-1 pt-1">
            <span className="label-text-alt text-red-400 truncate"> <i className="bi bi-info-circle"></i> {props.error}</span>
        </div> }
    </label>
}

export const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return <textarea {...props} className={`textarea textarea-bordered w-full h-24 ${props.className}`}></textarea>
}

const JoinBox = (props: InputProps) => {
    return <div className="join input-bordered border-[1px]">
        <span className="flex items-center justify-center w-[3rem] h-[3rem] join-item bg-base-200">
            <i className={`bi bi-${props.icon} text-xl`}></i>
        </span>
        <input className={`input w-full join-item ${props.className}`} {...props} />
    </div>
}