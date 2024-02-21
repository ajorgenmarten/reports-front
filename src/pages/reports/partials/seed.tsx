import { useFormik } from "formik"
import { Select, Input, TextArea } from "../../../components/input"
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
            <div className="flex flex-wrap gap-2">
                <Input classcomponent="lg:w-1/4 grow" label="Semilla" placeholder="CONTABXXX..." {...formik.getFieldProps('seed')} error={formik.touched.seed && formik.errors.seed} />
                <Input classcomponent="lg:w-1/4 grow" label="Departamento" placeholder="UEB 210, TALLER 117 ..." {...formik.getFieldProps('department')} error={formik.touched.department && formik.errors.department} />
                <Select classcomponent="lg:w-1/4 grow" label="Modulo" items={versatModules} icon="people" placeholder="Selecciona un modulo" {...formik.getFieldProps('module')} error={formik.touched.module && formik.errors.module}/>
                <button type="submit" className="btn btn-success w-full lg:w-auto self-start lg:mt-9">
                    <i className="bi bi-send"></i>Enviar
                </button>
            </div>
            <TextArea classcomponent="flex-grow" className="resize-none" placeholder="Escribe alguna descripcion...." {...formik.getFieldProps('description')} />
        </form>
    </div>
}