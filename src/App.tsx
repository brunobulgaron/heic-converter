import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FileInput, Github, Trash2 } from "lucide-react";
import heic2any from "heic2any";
import FileSaver from "file-saver";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState<
    string | ArrayBuffer | null
  >();
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ProgressEvent<FileReader> | string>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleError = (e: ProgressEvent<FileReader>) => {
    setError(e);
    setLoading(false);
  };

  const getBase64 = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result);
        setFileName(file.name.split(".")[0]);
      };
      reader.onerror = function (error) {
        return handleError(error);
      };
    }
  };

  useEffect(() => {
    if (fileName.length) {
      setError("");
    }
  }, [fileName]);

  const handleReset = () => {
    setLoading(false);
    setError(undefined);
    setSelectedFile(null);
    setFileName("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(undefined);

    if (fileName.length) {
      fetch(selectedFile as RequestInfo)
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          return heic2any({ blob, toType: "image/jpeg" });
        })
        .then((result) => {
          handleReset();

          return FileSaver.saveAs(result as Blob, `${fileName}.jpg`);
        })
        .catch((e: ProgressEvent<FileReader>) => {
          return handleError(e);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl text-zinc-100 font-bold">HEIC Converter</h1>

      <p className="text-md text-zinc-500">
        Convert .heic file to .jpg or .png
      </p>

      <form
        onSubmit={(e) => handleOnSubmit(e)}
        method="post"
        className="flex flex-col px-8 py-16"
      >
        <input
          ref={inputRef}
          onChange={(e) => getBase64(e)}
          disabled={loading}
          name="file"
          type="file"
          accept=".heic"
          className="text-sm text-zinc-400 rounded border border-zinc-800
            file:mr-5 file:py-2 file:px-6
            file:rounded file:border-0
            file:text-sm file:font-medium
            file:bg-zinc-800 file:text-zinc-500
            hover:cursor-pointer hover:file:bg-zinc-700
            hover:file:text-zinc-400"
        />

        {fileName !== "" && (
          <button
            type="button"
            className="flex justify-center items-center my-4 py-2 gap-2 text-red-500 outline outline-1 outline-red-900 rounded-sm hover:bg-red-900 hover:text-red-100 hover:outline hover:outline-1 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-600 disabled:outline-none disabled:text-zinc-100"
            onClick={() => handleReset()}
            disabled={loading}
          >
            <Trash2 size={16} strokeWidth={1.5} />
            <p>Remove</p>
          </button>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-green-700 text-zinc-200 text-md rounded disabled:bg-gray-600 disabled:cursor-not-allowed flex justify-center gap-2 items-center mt-8 hover:bg-green-600"
          disabled={loading || fileName === ""}
        >
          <FileInput size={16} strokeWidth={1.5} />
          {loading ? "Converting, please wait" : "Convert file"}
        </button>
      </form>

      {error && <p>{error as string}</p>}

      <footer className="max-w-md flex flex-col justify-center items-center text-center text-zinc-700 mt-10">
        <span>
          This is but a simple App developed on top of the{" "}
          <a
            href="https://github.com/alexcorvi/heic2any"
            target="_blank"
            className="hover:text-zinc-500"
          >
            heic2any
          </a>{" "}
          library.
        </span>
        <a
          href="https://github.com/brunobulgaron"
          className="flex gap-2 mt-4 hover:text-zinc-500"
          target="_blank"
        >
          <Github strokeWidth={1.5} /> GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;
