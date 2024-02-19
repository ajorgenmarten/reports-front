import { useFormik } from "formik"
import { ExperimentalSelect, Input, TextArea } from "../../../components/input"
import { versatModules } from '../../../schemas/reports.json'
import { reportSeedState, reportSeedValidation } from "./formik"

export const Seed = () => {
    const formik = useFormik({
        initialValues: reportSeedState,
        validationSchema: reportSeedValidation,
        onSubmit: data => console.log(data)
    })

    return <div className="p-4 h-full">
        <form className="flex flex-col gap-2 h-full" onSubmit={formik.handleSubmit}>
            <div className="flex gap-2">
            <Input label="Semilla" placeholder="CONTABXXX..." {...formik.getFieldProps('seed')} error={formik.touched.seed && formik.errors.seed} />
            <Input label="Departamento" placeholder="UEB 210, TALLER 117 ..." {...formik.getFieldProps('department')} error={formik.touched.department && formik.errors.department} />
            <ExperimentalSelect label="Modulo" items={versatModules} icon="people" placeholder="Selecciona un modulo" {...formik.getFieldProps('module')} error={formik.touched.module && formik.errors.module}/>
            </div>
            <button type="submit" className="btn btn-success self-start w-full md:w-auto px-20">Enviar</button>
            <TextArea classcomponent="flex-grow" placeholder="Escribe alguna descripcion...." {...formik.getFieldProps('description')} />
        </form>
    </div>
}
