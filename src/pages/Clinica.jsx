import MobileLayout from "../components/MobileLayout";
import SectionCard from "../components/SectionCard";
import PrimaryButton from "../components/PrimaryButton";
import { ClinicIcon } from "../components/Icons";

export default function Clinica() {
  const recorrido = [
    "Mano",
    "Brazo",
    "Vena axilar",
    "Vena subclavia",
    "Corazón",
  ];

  return (
    <MobileLayout>
      <div className="flex items-center justify-center gap-4 text-[#7a1f2a] mb-4">
        <ClinicIcon />
        <h1 className="text-3xl font-extrabold text-center text-[#7a1f2a]">
          Clínica
        </h1>
      </div>

      <p className="text-center text-sm text-[#5f3a40] mb-6 leading-6">
        Importancia clínica del sistema venoso del brazo.
      </p>

      <SectionCard title="🩸 Venopunción">
        <p className="text-[#5f3a40] mb-3">
          La venopunción es el procedimiento mediante el cual se accede a una
          vena para:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-[#5f3a40]">
          <li>Obtener muestras de sangre para análisis.</li>
          <li>Administrar medicamentos o líquidos intravenosos.</li>
          <li>Colocar catéteres para tratamientos a largo plazo.</li>
        </ul>

        <p className="mt-4 text-[#5f3a40] leading-7">
          La vena mediana del codo es la más utilizada para realizar
          venopunciones porque es superficial, está bien fijada por la
          aponeurosis bicipital y se encuentra alejada de estructuras nerviosas
          importantes. Además, la aponeurosis bicipital protege la arteria
          braquial y el nervio mediano, lo que disminuye el riesgo de lesión
          durante el procedimiento.
        </p>
      </SectionCard>

      <SectionCard title="🧬 Viaje de la sangre">
        <p className="mb-4 text-[#5f3a40]">
          Recorrido simplificado del retorno venoso:
        </p>

        <div className="relative pl-6">
          <div className="absolute left-[11px] top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-[#d99db1] via-[#c7727b] to-[#8ca0d4]" />

          <div className="space-y-4">
            {recorrido.map((paso, index) => (
              <div key={paso} className="relative flex items-center gap-4">
                <div className="relative z-10 h-6 w-6 rounded-full bg-white border-4 border-[#c7727b] shadow-sm" />

                <div className="flex-1 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm">
                  <p className="text-sm font-semibold text-[#7a1f2a]">
                    {paso}
                  </p>

                  <p className="text-xs text-[#7a555c] mt-1">
                    {index === 0 && "Origen del retorno venoso superficial y profundo."}
                    {index === 1 && "La sangre asciende por las venas del miembro superior."}
                    {index === 2 && "Recibe el drenaje de las venas braquiales y basílica."}
                    {index === 3 && "Continúa hacia la base del cuello."}
                    {index === 4 && "La sangre venosa regresa finalmente a la circulación central."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="mt-6 mb-24">
        <PrimaryButton
          text="Volver al inicio"
          to="/"
          icon="🏠"
          variant="clinic"
        />
      </div>
    </MobileLayout>
  );
}