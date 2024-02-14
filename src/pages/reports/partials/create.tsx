import { Input, TextArea } from "../../../components/input"

export const Create = () => {
    return <div className="pt-4">
        <form action="" className="w-full mx-auto max-w-[300px] md:max-w-[600px]">
            <Input label="Asunto" placeholder="Escribe aquí" classcomponent="mb-2"/>
            <TextArea className="h-52" placeholder="Escribe aquí la descripcion ..."/>
        </form>
    </div>
}