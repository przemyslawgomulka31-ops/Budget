import { useRef, useState } from "react";
import { FaDownload, FaFileImport } from "react-icons/fa";
import Toast from "../components/Toast";
import { exportData, importData } from "../utils/backup";
export default function Settings() {
  const input = useRef(null); const [toast, setToast] = useState("");
  return <div className="screen"><h1>Ustawienia</h1><p className="page-hint">Zapisz kopię danych lub przywróć wcześniejszą kopię.</p><section className="settings-card"><FaDownload /><div><h2>Eksport danych</h2><p>Pobierz kopię wszystkich transakcji w formacie JSON.</p></div><button onClick={exportData}>Eksportuj</button></section><section className="settings-card"><FaFileImport /><div><h2>Import danych</h2><p>Dodaj transakcje z pliku kopii zapasowej.</p></div><button onClick={() => input.current?.click()}>Wybierz plik</button><input ref={input} type="file" accept=".json" onChange={async (e) => { const file = e.target.files?.[0]; if (file) { await importData(file); setToast("Zaimportowano dane"); e.target.value = ""; } }} /></section><Toast message={toast} onClose={() => setToast("")} /></div>;
}
