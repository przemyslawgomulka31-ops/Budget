import {
  exportData,
  importData,
} from "../utils/backup";

export default function Settings() {
  return (
    <div className="screen">
      <h1>
        USTAWIENIA
      </h1>

      <button
        className="menu-button"
        onClick={
          exportData
        }
      >
        ⬇ EKSPORT
      </button>

      <input
        type="file"
        accept=".json"
        onChange={async (
          e
        ) => {
          const file =
            e.target.files[0];

          if (file) {
            await importData(
              file
            );

            alert(
              "Import zakończony"
            );
          }
        }}
      />
    </div>
  );
}