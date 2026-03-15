import { useState } from "react";
import MobileLayout from "../components/MobileLayout";
import SectionCard from "../components/SectionCard";
import PrimaryButton from "../components/PrimaryButton";
import { StudyIcon } from "../components/Icons";

export default function Estudiar() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <MobileLayout>
      <div className="flex items-center justify-center gap-4 text-[#7a1f2a] mb-4">
        <StudyIcon />
        <h1 className="text-3xl font-extrabold text-center text-[#7a1f2a]">
          Estudiar
        </h1>
      </div>

      <p className="text-center text-sm text-[#5f3a40] mb-6 leading-6">
        Repasa las venas principales del brazo de forma sencilla.
      </p>

      <button
        onClick={() => toggleSection("superficial")}
        className="w-full bg-gradient-to-r from-[#c98bb7] via-[#d99db1] to-[#cf8b9e] text-white font-semibold py-4 rounded-[1.4rem] mb-3 shadow-lg border border-white/30 active:scale-95 transition"
      >
        Sistema venoso superficial
      </button>

      {openSection === "superficial" && (
        <SectionCard title="Sistema venoso superficial">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-pretty">
              <strong>Vena cefálica:</strong> Es la principal vena superficial del miembro superior. Se origina en la red venosa dorsal de la mano y asciende por la parte anterolateral del brazo a través del surco bicipital lateral. Luego pasa por el surco deltopectoral y finalmente perfora la fascia clavipectoral para unirse a la vena axilar.
            </li>
            <li className="text-pretty">
              <strong>Vena basílica:</strong> Se origina en la parte medial de la red venosa dorsal de la mano y asciende por el lado medial del antebrazo y del brazo. En el tercio medio del brazo se vuelve profunda, acompaña a la arteria braquial y finalmente se une con las venas braquiales para formar la vena axilar.
            </li>
            <li className="text-pretty">
              <strong>Vena mediana:</strong> Se origina en el plexo venoso palmar, asciende superficialmente por la línea media del antebrazo y generalmente desemboca en la vena mediana cubital, basílica o cefálica en la región del codo.
            </li>
          </ul>

          <img
            src="/vena_superficial.png"
            alt="Venas Superficiales"
            className="mt-6 mx-auto w-full rounded-2xl border border-white/40"
          />
        </SectionCard>
      )}

      <button
        onClick={() => toggleSection("profundo")}
        className="w-full bg-gradient-to-r from-[#ba7f8c] via-[#d48f92] to-[#c7727b] text-white font-semibold py-4 rounded-[1.4rem] mb-3 shadow-lg border border-white/30 active:scale-95 transition"
      >
        Sistema venoso profundo
      </button>

      {openSection === "profundo" && (
        <SectionCard title="Sistema venoso profundo">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-pretty">
              <strong>Venas braquiales:</strong> acompañan siempre a las arterias principales, generalmente estas van en pares llamadas <strong>"Venas satelites"</strong>. Al igual estas venas van en anastomosis, es decir, se conectan entre sí.
            </li>
            <li className="text-pretty">Recogen sangre de estructuras profundas del brazo.</li>
          </ul>

          <img
            src="/vena_profundas.png"
            alt="Venas Profundas"
            className="mt-6 mx-auto w-full rounded-2xl border border-white/40"
          />
        </SectionCard>
      )}

      <button
        onClick={() => toggleSection("axilar")}
        className="w-full bg-gradient-to-r from-[#a98acb] via-[#bc9fd7] to-[#b483c2] text-white font-semibold py-4 rounded-[1.4rem] mb-4 shadow-lg border border-white/30 active:scale-95 transition"
      >
        Formación de la vena axilar
      </button>

      {openSection === "axilar" && (
        <SectionCard title="Formación de la vena axilar">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Vena Axilar:</strong> Se forma por la unión de las venas braquiales y la vena basílica en el borde inferior del músculo redondo mayor. Se divide en tres porciones que corresponden a las de la arteria axilar. Finalmente, en el borde lateral de la primera costilla se continúa como la vena subclavia. En la axila, las venas son numerosas, variables y presentan frecuentes anastomosis.
            </li>
          </ul>

          <img
            src="/vena_axilar.png"
            alt="Vena Axilar"
            className="mt-6 mx-auto w-full rounded-2xl border border-white/40"
          />
        </SectionCard>
      )}

      <div className="mt-6 mb-24">
        <PrimaryButton text="Volver al inicio" to="/" icon="🏠" variant="clinic" />
      </div>
    </MobileLayout>
  );
}